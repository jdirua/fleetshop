
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FuelLog } from '@/lib/types/fuelLog';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { deleteFuelLog } from '@/lib/actions/fuelLogs';
import { toast } from 'sonner';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

async function handleDelete(id: string) {
  const result = await deleteFuelLog(id);
  if (result.message?.includes('successfully')) {
    toast.success(result.message);
  } else {
    toast.error(result.message);
  }
}

export const columns: ColumnDef<FuelLog>[] = [
  {
    accessorKey: 'vehicle.licensePlate',
    header: 'Vehicle',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: 'liters',
    header: 'Liters',
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => `$${row.original.cost.toFixed(2)}`,
  },
  {
    accessorKey: 'odometer',
    header: 'Odometer',
    cell: ({ row }) => `${row.original.odometer} km`
  },
  {
    id: 'actions',
    cell: function Cell({ row }) {
      const fuelLog = row.original;
      const [isDeleting, setIsDeleting] = useState(false);

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/fuel-logs/${fuelLog.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Delete</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the fuel log.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  setIsDeleting(true);
                  await handleDelete(fuelLog.id);
                  setIsDeleting(false);
                }}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
