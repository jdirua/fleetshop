import { UserRole } from "@/lib/auth/roles";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: UserRole;
  disabled?: boolean;
}
