
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ActivityLog } from '@/lib/types/activityLog';

export const columns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
  },
  {
    accessorKey: 'user',
    header: 'User',
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
  {
    accessorKey: 'target.type',
    header: 'Target Type',
  },
  {
    accessorKey: 'target.id',
    header: 'Target ID',
  },
];
