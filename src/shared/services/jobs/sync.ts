import { getUuid } from '@/shared/lib/hash';
import {
  createJobSyncRun,
  findJobBySourceKey,
  isJobsDatabaseConfigured,
  JobSyncStatus,
  updateJobSyncRunById,
  upsertJob,
} from '@/shared/models/job';

import {
  JSEARCH_PROVIDER,
  searchJSearchJobs,
  mapJSearchJobToJobInput,
  type JSearchSearchParams,
} from './jsearch';

export type SyncJSearchJobsResult = {
  provider: string;
  query: JSearchSearchParams;
  syncRunId: string;
  fetchedCount: number;
  insertedCount: number;
  updatedCount: number;
  skippedCount: number;
};

export async function syncJSearchJobs(
  input: Partial<JSearchSearchParams> = {}
): Promise<SyncJSearchJobsResult> {
  if (!isJobsDatabaseConfigured()) {
    throw new Error('Jobs database is not configured');
  }

  const startedAt = new Date();
  const syncRunId = getUuid();
  const syncRun = await createJobSyncRun({
    id: syncRunId,
    provider: JSEARCH_PROVIDER,
    status: JobSyncStatus.RUNNING,
    querySnapshot: JSON.stringify(input),
    fetchedCount: 0,
    insertedCount: 0,
    updatedCount: 0,
    errorLog: null,
    startedAt,
    finishedAt: null,
  });

  try {
    const searchResult = await searchJSearchJobs(input);
    let insertedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    const seenSourceKeys = new Set<string>();

    for (const remoteJob of searchResult.jobs) {
      const mappedJob = mapJSearchJobToJobInput(remoteJob);

      if (!mappedJob?.sourceKey) {
        skippedCount += 1;
        continue;
      }

      if (seenSourceKeys.has(mappedJob.sourceKey)) {
        skippedCount += 1;
        continue;
      }

      seenSourceKeys.add(mappedJob.sourceKey);

      const existing = await findJobBySourceKey(mappedJob.sourceKey);
      await upsertJob(mappedJob);

      if (existing) {
        updatedCount += 1;
      } else {
        insertedCount += 1;
      }
    }

    await createFinishedSyncRun(syncRun.id, {
      fetchedCount: searchResult.jobs.length,
      insertedCount,
      updatedCount,
      status: JobSyncStatus.SUCCESS,
    });

    return {
      provider: JSEARCH_PROVIDER,
      query: searchResult.params,
      syncRunId: syncRun.id,
      fetchedCount: searchResult.jobs.length,
      insertedCount,
      updatedCount,
      skippedCount,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown jobs sync error';

    await createFinishedSyncRun(syncRun.id, {
      fetchedCount: 0,
      insertedCount: 0,
      updatedCount: 0,
      status: JobSyncStatus.FAILED,
      errorLog: message,
    });

    throw error;
  }
}

async function createFinishedSyncRun(
  syncRunId: string,
  data: {
    fetchedCount: number;
    insertedCount: number;
    updatedCount: number;
    status: JobSyncStatus;
    errorLog?: string | null;
  }
) {
  await updateJobSyncRunById(syncRunId, {
    status: data.status,
    fetchedCount: data.fetchedCount,
    insertedCount: data.insertedCount,
    updatedCount: data.updatedCount,
    errorLog: data.errorLog ?? null,
    finishedAt: new Date(),
  });
}
