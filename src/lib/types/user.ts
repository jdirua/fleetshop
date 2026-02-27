import { UserRole } from "@/lib/auth/roles";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
  };