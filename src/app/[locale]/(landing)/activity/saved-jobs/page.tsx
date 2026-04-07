import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { Empty, Pagination } from '@/shared/blocks/common';
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
  getSavedJobs,
  getSavedJobsCount,
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

export default async function SavedJobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  setRequestLocale(locale);

  const user = await getUserInfo();
  if (!user) {
    return <Empty message="Please sign in to see your saved jobs." />;
  }

  if (!isJobsDatabaseConfigured()) {
    return (
      <Empty message="Jobs database is not configured yet. Set DATABASE_URL in your env file to enable saved jobs." />
    );
  }

  const page = Math.max(Number(pageParam || '1') || 1, 1);
  const [t, jobs, total] = await Promise.all([
    getTranslations('activity.sidebar'),
    getSavedJobs({
      userId: user.id,
      page,
      limit: 12,
    }),
    getSavedJobsCount({
      userId: user.id,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Saved Jobs</h1>
        <p className="text-muted-foreground text-sm">
          Roles you can turn into AI resume-fit workflows next.
        </p>
      </div>

      {jobs.length === 0 ? (
        <Empty message="No saved jobs yet. Browse the jobs page and save a few roles first." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {jobs.map((item) => (
            <Card key={item.id} className="gap-0">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.companyName}</CardDescription>
                  </div>
                  <SaveJobButton jobId={item.id} initialSaved={true} />
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
                </div>
                <p className="text-muted-foreground text-sm leading-6">
                  {getSummary(item.description) || 'Saved for later review.'}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3 border-t">
                <span className="text-muted-foreground text-xs">
                  Saved on{' '}
                  {item.savedAt.toLocaleDateString(
                    locale === 'zh' ? 'zh-CN' : 'en-US'
                  )}
                </span>
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link href={`/jobs/${item.id}`}>View Job</Link>
                  </Button>
                  <Button asChild>
                    <a href={item.applyUrl} target="_blank" rel="noreferrer">
                      Apply
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{t('title')}</p>
        <Button variant="outline" asChild>
          <Link href="/jobs">Browse More Jobs</Link>
        </Button>
      </div>

      <Pagination total={total} limit={12} page={page} />
    </div>
  );
}
