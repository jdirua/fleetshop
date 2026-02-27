'use client';

import { signOut } from "@/app/actions";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";

export function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div>
        {/* You can add a page title or other elements here */}
      </div>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>No new notifications.</p>
            </div>
          </DialogContent>
        </Dialog>
        {user && <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>}
        <form action={signOut}>
          <Button variant="outline" type="submit">Sign Out</Button>
        </form>
      </div>
    </header>
  );
}
