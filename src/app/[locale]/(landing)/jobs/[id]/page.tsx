import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { Empty, PageHeader } from '@/shared/blocks/common';
import { SaveJobButton } from '@/shared/blocks/jobs/save-job-button';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  findJobById,
  getSavedJobIds,
  isJobsDatabaseConfigured,
} from '@/shared/models/job';
import { getUserInfo } from '@/shared/models/user';

function asText(content?: string | null) {
  return String(content || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  if (!isJobsDatabaseConfigured()) {
    return (
      <Empty message="Jobs database is not configured yet. Set DATABASE_URL in your env file to enable job details." />
    );
  }

  const [job, user] = await Promise.all([findJobById(id), getUserInfo()]);
  if (!job) {
    notFound();
  }

  const savedIds = user ? await getSavedJobIds(user.id, [job.id]) : [];
  const isSaved = savedIds.includes(job.id);

  return (
    <>
      <PageHeader
        title={job.title}
        description={`${job.companyName || 'Unknown company'}${job.locationText ? ` - ${job.locationText}` : ''}`}
        className="pb-8"
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-[2fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>
              Direct employer-style role page for your future AI tailoring flow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border px-2 py-1">
                {job.isRemote ? 'Remote' : job.locationText || 'Location N/A'}
              </span>
              {job.sourceAts ? (
                <span className="rounded-full border px-2 py-1">
                  {job.sourceAts}
                </span>
              ) : null}
              {job.employmentType ? (
                <span className="rounded-full border px-2 py-1">
                  {job.employmentType}
                </span>
              ) : null}
              {job.salaryText ? (
                <span className="rounded-full border px-2 py-1">
                  {job.salaryText}
                </span>
              ) : null}
            </div>

            <p className="text-sm leading-7 whitespace-pre-wrap">
              {asText(job.description) || 'No description available yet.'}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply Flow</CardTitle>
              <CardDescription>
                Save this role now, then plug the saved list into your AI resume fit flow next.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Company:</span>{' '}
                  {job.companyName || 'Unknown company'}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{' '}
                  {job.locationText || 'Not specified'}
                </p>
                <p>
                  <span className="font-medium">ATS:</span>{' '}
                  {job.sourceAts || 'Unknown'}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href={job.applyUrl} target="_blank" rel="noreferrer">
                    Apply on Company Site
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/jobs">Back to Jobs</Link>
                </Button>
              </div>

              {user ? (
                <SaveJobButton jobId={job.id} initialSaved={isSaved} />
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
