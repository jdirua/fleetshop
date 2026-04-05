
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { WorkOrder } from "@/lib/types/workOrder"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { hasPermission } from "@/lib/auth/roles";
import Link from "next/link";

// New component to handle the actions dropdown
const WorkOrderActions = ({ workOrder }: { workOrder: WorkOrder }) => {
  const { user } = useUser();
  const canUpdate = user && user.role && hasPermission(user.role, 'work-orders:update');
  const canDelete = user && user.role && hasPermission(user.role, 'work-orders:delete');

  return (
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
          <Link href={`/dashboard/work-orders/${workOrder.id}`}>View Details</Link>
        </DropdownMenuItem>
        {canUpdate && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/work-orders/${workOrder.id}/edit`}>Edit Work Order</Link>
          </DropdownMenuItem>
        )}
        {canDelete && (
          <DropdownMenuItem>
            {/* Logic to delete a work order should be implemented here */}
            Delete Work Order
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<WorkOrder>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.original.vehicle;
      return vehicle ? `${vehicle.make} ${vehicle.model}` : 'N/A';
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "assignedMechanic.displayName",
    header: "Assigned Mechanic",
  },
  {
    id: "actions",
    cell: ({ row }) => <WorkOrderActions workOrder={row.original} />,
  },
];
