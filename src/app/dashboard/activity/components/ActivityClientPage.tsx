'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ActivityLog } from '@/lib/types/activityLog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationControls } from '@/components/ui/PaginationControls'; // Assuming you have a pagination component

interface ActivityClientPageProps {
  initialActivityLogs: ActivityLog[];
  totalPages: number;
}

export function ActivityClientPage({ initialActivityLogs, totalPages }: ActivityClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', page.toString());
    router.push(`/dashboard/activity?${current.toString()}`);
  };

  return (
    <div className="p-4 md:p-8 pt-6">
      <Card className='bg-slate-800/75 backdrop-blur-lg border-slate-300/20'>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialActivityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.target.type}: {log.target.id}</TableCell>
                  <TableCell>{log.userId}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-4">
        <PaginationControls
          currentPage={Number(searchParams.get('page')) || 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
