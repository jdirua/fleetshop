
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem } from "@/lib/types/inventory";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ItemActions } from "./ItemActions";

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "reorderPoint",
    header: "Reorder Point",
  },
    {
        accessorKey: "supplier",
        header: "Supplier",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <ItemActions item={item} />
      );
    },
  },
];
