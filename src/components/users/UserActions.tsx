
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types/user";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { deleteUser, toggleUserStatus } from "@/app/actions";
import { toast } from "sonner";
import Link from "next/link";

export function UserActions({ user }: { user: User }) {
  const handleDelete = async () => {
    const result = await deleteUser(user.uid);
    if (result.success) {
      toast.success("User deleted successfully");
    } else {
      toast.error(result.error);
    }
  };

  const handleToggleStatus = async () => {
    const result = await toggleUserStatus(user.uid, !user.disabled);
    if (result.success) {
      toast.success(`User ${user.disabled ? "enabled" : "disabled"} successfully`);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/users/${user.uid}`}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus}>
            {user.disabled ? "Enable" : "Disable"}
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
