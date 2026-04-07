import { respData, respErr } from '@/shared/lib/resp';
import {
  getJobs,
  getJobsCount,
  isJobsDatabaseConfigured,
} from '@/shared/models/job';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get('page') || '1') || 1, 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get('limit') || '20') || 20, 1),
      50
    );
    const q = searchParams.get('q') || undefined;
    const company = searchParams.get('company') || undefined;
    const sourceAts = searchParams.get('sourceAts') || undefined;
    const remote = searchParams.get('remote');
    const isRemote =
      remote === 'true' ? true : remote === 'false' ? false : undefined;

    if (!isJobsDatabaseConfigured()) {
      return respData({
        list: [],
        total: 0,
        page,
        limit,
        hasMore: false,
        dbConfigured: false,
      });
    }

    const [list, total] = await Promise.all([
      getJobs({
        q,
        company,
        sourceAts,
        isRemote,
        page,
        limit,
      }),
      getJobsCount({
        q,
        company,
        sourceAts,
        isRemote,
      }),
    ]);

    return respData({
      list,
      total,
      page,
      limit,
      hasMore: page * limit < total,
      dbConfigured: true,
    });
  } catch (e: any) {
    console.log('get jobs failed:', e);
    return respErr(`get jobs failed: ${e.message}`);
  }
}
