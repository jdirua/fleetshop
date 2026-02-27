
export interface ActivityLog {
  id: string;
  action: string;
  target: { type: string; id: string; };
  userId: string;
  timestamp: any;
}
