
import { getActivityLogs } from '@/lib/actions/activityLogs';
import { DataTable } from '@/components/ui/DataTable';
import { columns } from './columns';
import { ActivityLog } from '@/lib/types/activityLog';

export default async function ActivityLogPage() {
  const activityLogs: ActivityLog[] = await getActivityLogs() as ActivityLog[];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Activity Log</h1>
      <DataTable columns={columns} data={activityLogs} />
    </div>
  );
}
