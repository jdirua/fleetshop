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
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between p-4 bg-secondary isolate relative z-10 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
      <div>
        {user && (
          <h1 className="text-xl font-semibold">
            Welcome back, {user.displayName || user.email}!
          </h1>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
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
        <form action={signOut}>
          <Button variant="outline" type="submit">Sign Out</Button>
        </form>
      </div>
    </header>
  );
}
