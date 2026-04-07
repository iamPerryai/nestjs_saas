import { respData, respErr } from '@/shared/lib/resp';
import {
  findJobById,
  findSavedJob,
  isJobsDatabaseConfigured,
  removeSavedJobForUser,
  saveJobForUser,
} from '@/shared/models/job';
import { getUserInfo } from '@/shared/models/user';

export async function POST(req: Request) {
  try {
    const { jobId } = await req.json();
    if (!jobId) {
      return respErr('jobId is required');
    }

    if (!isJobsDatabaseConfigured()) {
      return respErr('jobs database is not configured');
    }

    const user = await getUserInfo();
    if (!user) {
      return respErr('no auth, please sign in');
    }

    const job = await findJobById(jobId);
    if (!job) {
      return respErr('job not found');
    }

    const existing = await findSavedJob({
      userId: user.id,
      jobId,
    });

    if (existing) {
      await removeSavedJobForUser({
        userId: user.id,
        jobId,
      });

      return respData({ saved: false });
    }

    await saveJobForUser({
      userId: user.id,
      jobId,
    });

    return respData({ saved: true });
  } catch (e: any) {
    console.log('toggle saved job failed:', e);
    return respErr(`toggle saved job failed: ${e.message}`);
  }
}
