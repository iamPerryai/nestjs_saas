import { respData, respErr } from '@/shared/lib/resp';
import { findJobById, isJobsDatabaseConfigured } from '@/shared/models/job';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return respErr('job id is required');
    }

    if (!isJobsDatabaseConfigured()) {
      return respErr('jobs database is not configured');
    }

    const job = await findJobById(id);
    if (!job) {
      return respErr('job not found');
    }

    return respData(job);
  } catch (e: any) {
    console.log('get job detail failed:', e);
    return respErr(`get job detail failed: ${e.message}`);
  }
}
