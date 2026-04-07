import { PERMISSIONS } from '@/core/rbac';
import { respData, respErr } from '@/shared/lib/resp';
import { getUserInfo } from '@/shared/models/user';
import { syncJSearchJobs } from '@/shared/services/jobs/sync';
import { hasPermission } from '@/shared/services/rbac';

export async function POST(req: Request) {
  try {
    const user = await getUserInfo();
    if (!user) {
      return respErr('no auth, please sign in');
    }

    const isAdmin = await hasPermission(user.id, PERMISSIONS.ADMIN_ACCESS);
    if (!isAdmin) {
      return respErr('no permission');
    }

    const body = await req.json().catch(() => ({}));
    const result = await syncJSearchJobs(body || {});

    return respData(result);
  } catch (e: any) {
    console.log('sync jobs failed:', e);
    return respErr(`sync jobs failed: ${e.message}`);
  }
}
