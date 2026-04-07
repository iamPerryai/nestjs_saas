import { and, count, desc, eq, inArray, like } from 'drizzle-orm';

import { envConfigs } from '@/config';
import { db } from '@/core/db';
import { job, jobSyncRun, savedJob } from '@/config/db/schema';
import { getUuid } from '@/shared/lib/hash';

export type Job = typeof job.$inferSelect;
export type NewJob = typeof job.$inferInsert;
export type UpdateJob = Partial<Omit<NewJob, 'id' | 'createdAt'>>;

export type JobSyncRun = typeof jobSyncRun.$inferSelect;
export type NewJobSyncRun = typeof jobSyncRun.$inferInsert;
export type UpdateJobSyncRun = Partial<Omit<NewJobSyncRun, 'id' | 'createdAt'>>;

export type SavedJob = Job & {
  savedAt: Date;
};

export enum JobStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum JobSyncStatus {
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
}

type JobListFilters = {
  q?: string;
  company?: string;
  sourceAts?: string;
  isRemote?: boolean;
  status?: JobStatus;
  page?: number;
  limit?: number;
};

const JOBS_DATABASE_NOT_CONFIGURED = 'Jobs database is not configured';

const jobSelection = {
  id: job.id,
  source: job.source,
  sourceJobId: job.sourceJobId,
  sourceKey: job.sourceKey,
  sourceAts: job.sourceAts,
  title: job.title,
  companyName: job.companyName,
  companyDomain: job.companyDomain,
  locationText: job.locationText,
  isRemote: job.isRemote,
  employmentType: job.employmentType,
  salaryText: job.salaryText,
  salaryMin: job.salaryMin,
  salaryMax: job.salaryMax,
  salaryCurrency: job.salaryCurrency,
  description: job.description,
  applyUrl: job.applyUrl,
  postedAt: job.postedAt,
  fetchedAt: job.fetchedAt,
  status: job.status,
  searchText: job.searchText,
  rawPayload: job.rawPayload,
  createdAt: job.createdAt,
  updatedAt: job.updatedAt,
  deletedAt: job.deletedAt,
};

function buildSearchText(values: Array<string | null | undefined>) {
  return values
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function isJobsDatabaseConfigured() {
  return Boolean(envConfigs.database_url?.trim());
}

function assertJobsDatabaseConfigured() {
  if (!isJobsDatabaseConfigured()) {
    throw new Error(JOBS_DATABASE_NOT_CONFIGURED);
  }
}

function normalizeJobData(data: Partial<NewJob>): NewJob {
  const searchText =
    data.searchText ||
    buildSearchText([
      data.title,
      data.companyName,
      data.locationText,
      data.sourceAts,
      data.employmentType,
      data.salaryText,
      data.description,
    ]);

  return {
    id: data.id || getUuid(),
    source: data.source || '',
    sourceJobId: data.sourceJobId || '',
    sourceKey: data.sourceKey || '',
    sourceAts: data.sourceAts || null,
    title: data.title || '',
    companyName: data.companyName || '',
    companyDomain: data.companyDomain || null,
    locationText: data.locationText || '',
    isRemote: data.isRemote ?? false,
    employmentType: data.employmentType || null,
    salaryText: data.salaryText || null,
    salaryMin: data.salaryMin ?? null,
    salaryMax: data.salaryMax ?? null,
    salaryCurrency: data.salaryCurrency || null,
    description: data.description || null,
    applyUrl: data.applyUrl || '',
    postedAt: data.postedAt || null,
    fetchedAt: data.fetchedAt || new Date(),
    status: data.status || JobStatus.ACTIVE,
    searchText,
    rawPayload: data.rawPayload || null,
  };
}

export async function createJob(data: NewJob) {
  assertJobsDatabaseConfigured();
  const [result] = await db()
    .insert(job)
    .values(normalizeJobData(data))
    .returning();
  return result;
}

export async function updateJob(id: string, data: UpdateJob) {
  assertJobsDatabaseConfigured();
  const updates: UpdateJob = { ...data };
  const computedSearchText = buildSearchText([
    updates.title,
    updates.companyName,
    updates.locationText,
    updates.sourceAts,
    updates.employmentType,
    updates.salaryText,
    updates.description,
  ]);

  if (!updates.searchText && computedSearchText) {
    updates.searchText = computedSearchText;
  }

  const [result] = await db()
    .update(job)
    .set(updates)
    .where(eq(job.id, id))
    .returning();

  return result;
}

export async function upsertJob(data: Partial<NewJob>) {
  assertJobsDatabaseConfigured();
  const normalized = normalizeJobData(data);

  const [result] = await db()
    .insert(job)
    .values(normalized)
    .onConflictDoUpdate({
      target: job.sourceKey,
      set: {
        source: normalized.source,
        sourceJobId: normalized.sourceJobId,
        sourceAts: normalized.sourceAts,
        title: normalized.title,
        companyName: normalized.companyName,
        companyDomain: normalized.companyDomain,
        locationText: normalized.locationText,
        isRemote: normalized.isRemote,
        employmentType: normalized.employmentType,
        salaryText: normalized.salaryText,
        salaryMin: normalized.salaryMin,
        salaryMax: normalized.salaryMax,
        salaryCurrency: normalized.salaryCurrency,
        description: normalized.description,
        applyUrl: normalized.applyUrl,
        postedAt: normalized.postedAt,
        fetchedAt: normalized.fetchedAt,
        status: normalized.status,
        searchText: normalized.searchText,
        rawPayload: normalized.rawPayload,
      },
    })
    .returning();

  return result;
}

export async function createJobSyncRun(data: NewJobSyncRun) {
  assertJobsDatabaseConfigured();
  const [result] = await db().insert(jobSyncRun).values(data).returning();
  return result;
}

export async function updateJobSyncRunById(id: string, data: UpdateJobSyncRun) {
  assertJobsDatabaseConfigured();
  const [result] = await db()
    .update(jobSyncRun)
    .set(data)
    .where(eq(jobSyncRun.id, id))
    .returning();

  return result;
}

export async function findJobById(id: string) {
  if (!isJobsDatabaseConfigured()) {
    return undefined;
  }

  const [result] = await db()
    .select()
    .from(job)
    .where(and(eq(job.id, id), eq(job.status, JobStatus.ACTIVE)))
    .limit(1);

  return result;
}

export async function findJobBySourceKey(sourceKey: string) {
  if (!isJobsDatabaseConfigured()) {
    return undefined;
  }

  const [result] = await db()
    .select()
    .from(job)
    .where(eq(job.sourceKey, sourceKey))
    .limit(1);

  return result;
}

export async function getJobs({
  q,
  company,
  sourceAts,
  isRemote,
  status = JobStatus.ACTIVE,
  page = 1,
  limit = 20,
}: JobListFilters = {}): Promise<Job[]> {
  if (!isJobsDatabaseConfigured()) {
    return [];
  }

  const query = q?.trim().toLowerCase();
  const companyName = company?.trim();

  return db()
    .select()
    .from(job)
    .where(
      and(
        status ? eq(job.status, status) : undefined,
        query ? like(job.searchText, `%${query}%`) : undefined,
        companyName ? like(job.companyName, `%${companyName}%`) : undefined,
        sourceAts ? eq(job.sourceAts, sourceAts) : undefined,
        typeof isRemote === 'boolean' ? eq(job.isRemote, isRemote) : undefined
      )
    )
    .orderBy(desc(job.postedAt), desc(job.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);
}

export async function getJobsCount({
  q,
  company,
  sourceAts,
  isRemote,
  status = JobStatus.ACTIVE,
}: Omit<JobListFilters, 'page' | 'limit'> = {}) {
  if (!isJobsDatabaseConfigured()) {
    return 0;
  }

  const query = q?.trim().toLowerCase();
  const companyName = company?.trim();

  const [result] = await db()
    .select({ count: count() })
    .from(job)
    .where(
      and(
        status ? eq(job.status, status) : undefined,
        query ? like(job.searchText, `%${query}%`) : undefined,
        companyName ? like(job.companyName, `%${companyName}%`) : undefined,
        sourceAts ? eq(job.sourceAts, sourceAts) : undefined,
        typeof isRemote === 'boolean' ? eq(job.isRemote, isRemote) : undefined
      )
    );

  return result?.count || 0;
}

export async function findSavedJob({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  if (!isJobsDatabaseConfigured()) {
    return undefined;
  }

  const [result] = await db()
    .select()
    .from(savedJob)
    .where(and(eq(savedJob.userId, userId), eq(savedJob.jobId, jobId)))
    .limit(1);

  return result;
}

export async function saveJobForUser({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  assertJobsDatabaseConfigured();
  const existing = await findSavedJob({ userId, jobId });
  if (existing) {
    return existing;
  }

  const [result] = await db()
    .insert(savedJob)
    .values({
      id: getUuid(),
      userId,
      jobId,
    })
    .returning();

  return result;
}

export async function removeSavedJobForUser({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  assertJobsDatabaseConfigured();
  await db()
    .delete(savedJob)
    .where(and(eq(savedJob.userId, userId), eq(savedJob.jobId, jobId)));
}

export async function getSavedJobs({
  userId,
  page = 1,
  limit = 20,
}: {
  userId: string;
  page?: number;
  limit?: number;
}): Promise<SavedJob[]> {
  if (!isJobsDatabaseConfigured()) {
    return [];
  }

  const result = await db()
    .select({
      ...jobSelection,
      savedAt: savedJob.createdAt,
    })
    .from(savedJob)
    .innerJoin(job, eq(savedJob.jobId, job.id))
    .where(and(eq(savedJob.userId, userId), eq(job.status, JobStatus.ACTIVE)))
    .orderBy(desc(savedJob.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  return result;
}

export async function getSavedJobsCount({ userId }: { userId: string }) {
  if (!isJobsDatabaseConfigured()) {
    return 0;
  }

  const [result] = await db()
    .select({ count: count() })
    .from(savedJob)
    .innerJoin(job, eq(savedJob.jobId, job.id))
    .where(and(eq(savedJob.userId, userId), eq(job.status, JobStatus.ACTIVE)));

  return result?.count || 0;
}

export async function getSavedJobIds(userId: string, jobIds: string[]) {
  if (!isJobsDatabaseConfigured() || !jobIds.length) {
    return [];
  }

  const result = await db()
    .select({ jobId: savedJob.jobId })
    .from(savedJob)
    .where(and(eq(savedJob.userId, userId), inArray(savedJob.jobId, jobIds)));

  return result.map((item: { jobId: string }) => item.jobId);
}
