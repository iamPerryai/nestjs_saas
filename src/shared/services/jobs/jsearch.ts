import { md5 } from '@/shared/lib/hash';
import { JobStatus, type NewJob } from '@/shared/models/job';

export const JSEARCH_PROVIDER = 'jsearch';
export const DEFAULT_JSEARCH_QUERY = 'developer jobs in chicago';
export const DEFAULT_JSEARCH_COUNTRY = 'us';
export const DEFAULT_JSEARCH_DATE_POSTED = 'all';

export type JSearchSearchParams = {
  query: string;
  page?: number;
  numPages?: number;
  country?: string;
  datePosted?: string;
};

export type JSearchApiJob = {
  employer_name?: string | null;
  employer_website?: string | null;
  job_apply_link?: string | null;
  job_city?: string | null;
  job_country?: string | null;
  job_description?: string | null;
  job_employment_type?: string | null;
  job_employment_types?: string[] | null;
  job_google_link?: string | null;
  job_id?: string | null;
  job_is_remote?: boolean | null;
  job_max_salary?: number | string | null;
  job_min_salary?: number | string | null;
  job_posted_at_datetime_utc?: string | null;
  job_posted_at_timestamp?: number | string | null;
  job_publisher?: string | null;
  job_salary_currency?: string | null;
  job_salary_period?: string | null;
  job_state?: string | null;
  job_title?: string | null;
  [key: string]: unknown;
};

type JSearchApiResponse = {
  data?: JSearchApiJob[];
  status?: string;
  message?: string;
};

function getJSearchConfig() {
  const apiKey = process.env.JSEARCH_API_KEY || process.env.RAPIDAPI_KEY || '';
  const apiHost = process.env.JSEARCH_API_HOST || 'jsearch.p.rapidapi.com';
  const apiBaseUrl =
    process.env.JSEARCH_API_BASE_URL || 'https://jsearch.p.rapidapi.com';

  if (!apiKey) {
    throw new Error('JSEARCH_API_KEY is not set');
  }

  return {
    apiKey,
    apiHost,
    apiBaseUrl,
  };
}

function normalizeSearchParams(
  input: Partial<JSearchSearchParams> = {}
): JSearchSearchParams {
  return {
    query: String(input.query || DEFAULT_JSEARCH_QUERY).trim(),
    page: Math.max(Number(input.page || 1) || 1, 1),
    numPages: Math.max(Number(input.numPages || 1) || 1, 1),
    country: String(input.country || DEFAULT_JSEARCH_COUNTRY).trim() || 'us',
    datePosted:
      String(input.datePosted || DEFAULT_JSEARCH_DATE_POSTED).trim() || 'all',
  };
}

function parseDate(value?: string | number | null) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const candidate =
    typeof value === 'number' || /^\d+$/.test(String(value).trim())
      ? new Date(Number(value) * 1000)
      : new Date(String(value));

  return Number.isNaN(candidate.getTime()) ? null : candidate;
}

function toNumber(value?: string | number | null) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractDomain(url?: string | null) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url).hostname.replace(/^www\./, '') || null;
  } catch {
    return null;
  }
}

function getEmploymentType(job: JSearchApiJob) {
  if (Array.isArray(job.job_employment_types)) {
    const values = job.job_employment_types
      .map((item) => String(item || '').trim())
      .filter(Boolean);
    if (values.length) {
      return values.join(', ');
    }
  }

  const fallback = String(job.job_employment_type || '').trim();
  return fallback || null;
}

function getLocationText(job: JSearchApiJob) {
  const values = [job.job_city, job.job_state, job.job_country]
    .map((item) => String(item || '').trim())
    .filter(Boolean);

  if (values.length) {
    return values.join(', ');
  }

  return job.job_is_remote ? 'Remote' : '';
}

function getApplyUrl(job: JSearchApiJob) {
  const candidates = [job.job_apply_link, job.job_google_link, job.employer_website]
    .map((item) => String(item || '').trim())
    .filter(Boolean);

  return candidates[0] || '';
}

function formatSalaryText(job: JSearchApiJob) {
  const min = toNumber(job.job_min_salary);
  const max = toNumber(job.job_max_salary);
  const currency = String(job.job_salary_currency || '').trim();
  const period = String(job.job_salary_period || '').trim();

  if (min === null && max === null) {
    return null;
  }

  const parts = [currency].filter(Boolean);

  if (min !== null && max !== null) {
    parts.push(`${min} - ${max}`);
  } else {
    parts.push(String(min ?? max));
  }

  if (period) {
    parts.push(`/${period}`);
  }

  return parts.join(' ').trim() || null;
}

function getSourceId(job: JSearchApiJob) {
  const values = [
    job.job_id,
    job.job_apply_link,
    job.job_google_link,
    job.job_title,
    job.employer_name,
    job.job_city,
    job.job_state,
    job.job_country,
  ]
    .map((item) => String(item || '').trim())
    .filter(Boolean);

  return values.join('|');
}

export function mapJSearchJobToJobInput(job: JSearchApiJob): Partial<NewJob> | null {
  const sourceJobId = getSourceId(job);
  const title = String(job.job_title || '').trim();
  const applyUrl = getApplyUrl(job);

  if (!sourceJobId || !title || !applyUrl) {
    return null;
  }

  const postedAt =
    parseDate(job.job_posted_at_datetime_utc) ||
    parseDate(job.job_posted_at_timestamp);

  return {
    source: JSEARCH_PROVIDER,
    sourceJobId,
    sourceKey: `${JSEARCH_PROVIDER}:${md5(sourceJobId)}`,
    sourceAts: String(job.job_publisher || '').trim() || null,
    title,
    companyName: String(job.employer_name || '').trim(),
    companyDomain: extractDomain(job.employer_website),
    locationText: getLocationText(job),
    isRemote: Boolean(job.job_is_remote),
    employmentType: getEmploymentType(job),
    salaryText: formatSalaryText(job),
    salaryMin: toNumber(job.job_min_salary),
    salaryMax: toNumber(job.job_max_salary),
    salaryCurrency: String(job.job_salary_currency || '').trim() || null,
    description: String(job.job_description || '').trim() || null,
    applyUrl,
    postedAt,
    fetchedAt: new Date(),
    status: JobStatus.ACTIVE,
    rawPayload: JSON.stringify(job),
  };
}

export async function searchJSearchJobs(input: Partial<JSearchSearchParams> = {}) {
  const { apiBaseUrl, apiHost, apiKey } = getJSearchConfig();
  const params = normalizeSearchParams(input);

  const url = new URL('/search', apiBaseUrl);
  url.searchParams.set('query', params.query);
  url.searchParams.set('page', String(params.page));
  url.searchParams.set('num_pages', String(params.numPages));
  url.searchParams.set('country', params.country || DEFAULT_JSEARCH_COUNTRY);
  url.searchParams.set(
    'date_posted',
    params.datePosted || DEFAULT_JSEARCH_DATE_POSTED
  );

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': apiKey,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `JSearch request failed with ${response.status}: ${
        errorText || response.statusText
      }`
    );
  }

  const result = (await response.json()) as JSearchApiResponse;

  return {
    params,
    jobs: Array.isArray(result.data) ? result.data : [],
    status: result.status || '',
    message: result.message || '',
  };
}
