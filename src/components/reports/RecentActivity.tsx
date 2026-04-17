import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActivityLog } from '@/lib/types/activityLog';

interface RecentActivityProps {
  activityLogs: ActivityLog[];
}

export function RecentActivity({ activityLogs }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.target ? `${log.target.type} - ${log.target.id}` : ''}</TableCell>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
