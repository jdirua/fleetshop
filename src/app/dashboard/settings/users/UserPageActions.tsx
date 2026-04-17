'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";
import { ManageRolesDialog } from "./ManageRolesDialog";

export function UserPageActions() {
    return (
        <div className="flex items-center gap-4">
            <ManageRolesDialog>
                <Button className="bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-300">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Roles
                </Button>
            </ManageRolesDialog>
            <CreateUserDialog asChild>
              <Button className="bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition-all duration-300">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New User
              </Button>
            </CreateUserDialog>
        </div>
    );
}
