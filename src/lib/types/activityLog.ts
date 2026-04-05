
import { User } from '@/lib/types/user';

export interface ActivityLog {
  id: string;
  action: string;
  target: { type: string; id: string; };
  userId: string;
  timestamp: string;
  user?: User;
  details?: string;
}
