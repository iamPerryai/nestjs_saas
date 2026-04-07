import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { Empty, PageHeader, Pagination } from '@/shared/blocks/common';
import { SaveJobButton } from '@/shared/blocks/jobs/save-job-button';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  getSavedJobIds,
  getJobs,
  getJobsCount,
  isJobsDatabaseConfigured,
} from '@/shared/models/job';
import { getUserInfo } from '@/shared/models/user';

function getSummary(description?: string | null) {
  return String(description || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string; remote?: string }>;
}) {
  const { locale } = await params;
  const { q, page: pageParam, remote } = await searchParams;
  setRequestLocale(locale);

  const page = Math.max(Number(pageParam || '1') || 1, 1);
  const isRemote =
    remote === 'true' ? true : remote === 'false' ? false : undefined;
  const dbConfigured = isJobsDatabaseConfigured();

  const [t, jobs, total, user] = await Promise.all([
    getTranslations('pages.index'),
    getJobs({
      q,
      isRemote,
      page,
      limit: 12,
    }),
    getJobsCount({
      q,
      isRemote,
    }),
    getUserInfo(),
  ]);

  const savedIds = new Set(
    user ? await getSavedJobIds(user.id, jobs.map((item) => item.id)) : []
  );

  return (
    <>
      <PageHeader
        title="Fresh Startup Jobs"
        description="Search remote-ready jobs pulled into your own job database, then save the best ones for AI tailoring in the next step."
        className="pb-8"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <form className="mb-8 grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_180px_120px]">
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="Search jobs, companies, or keywords"
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none"
          />
          <select
            name="remote"
            defaultValue={remote || ''}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none"
          >
            <option value="">All job types</option>
            <option value="true">Remote only</option>
            <option value="false">On-site / hybrid</option>
          </select>
          <Button type="submit">Search</Button>
        </form>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Open Roles</h2>
            <p className="text-muted-foreground text-sm">
              {total} jobs available{q ? ` for "${q}"` : ''}.
            </p>
          </div>
          {user ? (
            <Button variant="outline" asChild>
              <Link href="/activity/saved-jobs">Saved Jobs</Link>
            </Button>
          ) : null}
        </div>

        {jobs.length === 0 ? (
          <Empty
            message={
              dbConfigured
                ? 'No jobs found yet. Once sync is wired up, new roles will appear here.'
                : 'Jobs database is not configured yet. Set DATABASE_URL in your env file to enable this feature.'
            }
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((item) => (
              <Card key={item.id} className="gap-0">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-lg leading-6">
                        {item.title}
                      </CardTitle>
                      <CardDescription>
                        {item.companyName || 'Unknown company'}
                      </CardDescription>
                    </div>
                    {user ? (
                      <SaveJobButton
                        jobId={item.id}
                        initialSaved={savedIds.has(item.id)}
                      />
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border px-2 py-1">
                      {item.isRemote ? 'Remote' : item.locationText || 'Location N/A'}
                    </span>
                    {item.sourceAts ? (
                      <span className="rounded-full border px-2 py-1">
                        {item.sourceAts}
                      </span>
                    ) : null}
                    {item.employmentType ? (
                      <span className="rounded-full border px-2 py-1">
                        {item.employmentType}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-muted-foreground text-sm leading-6">
                    {getSummary(item.description) || t('page.description')}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t">
                  <span className="text-muted-foreground text-xs">
                    {item.salaryText || item.locationText || 'Freshly synced role'}
                  </span>
                  <Button asChild>
                    <Link href={`/jobs/${item.id}`}>View Job</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {dbConfigured ? (
          <Pagination total={total} limit={12} page={page} className="mt-10" />
        ) : null}
      </section>
    </>
  );
}
