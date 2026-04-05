
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ActivityLog } from '@/lib/types';

interface RecentActivityProps {
  activityLogs: ActivityLog[];
}

export function RecentActivity({ activityLogs }: RecentActivityProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!Array.isArray(activityLogs) || activityLogs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No recent activity to display.
            </TableCell>
          </TableRow>
        ) : (
          activityLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.target.type} ({log.target.id})</TableCell>
              <TableCell>{log.userId}</TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
