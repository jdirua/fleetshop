'use client'

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/types/user"
import { Badge } from "@/components/ui/badge"
import { UserActions } from "@/components/users/UserActions"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "displayName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role")
      return <Badge variant="outline">{role as string}</Badge>
    },
  },
  {
    accessorKey: "lastSignInTime",
    header: "Last Signed In",
    cell: ({ row }) => {
      const date = row.getValue("lastSignInTime")
      return date ? new Date(date as string).toLocaleDateString() : 'Never'
    },
  },
  {
    accessorKey: "disabled",
    header: "Status",
    cell: ({ row }) => {
      const disabled = row.getValue("disabled")
      return disabled ? <Badge variant="destructive">Disabled</Badge> : <Badge className="bg-green-500">Active</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      return <UserActions user={user} />
    },
  },
]
