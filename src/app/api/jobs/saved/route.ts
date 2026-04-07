import { respData, respErr } from '@/shared/lib/resp';
import {
  getSavedJobs,
  getSavedJobsCount,
  isJobsDatabaseConfigured,
} from '@/shared/models/job';
import { getUserInfo } from '@/shared/models/user';

export async function GET(req: Request) {
  try {
    const user = await getUserInfo();
    if (!user) {
      return respErr('no auth, please sign in');
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get('page') || '1') || 1, 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get('limit') || '20') || 20, 1),
      50
    );

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
      getSavedJobs({
        userId: user.id,
        page,
        limit,
      }),
      getSavedJobsCount({
        userId: user.id,
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
    console.log('get saved jobs failed:', e);
    return respErr(`get saved jobs failed: ${e.message}`);
  }
}
