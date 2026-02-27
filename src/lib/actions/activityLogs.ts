'use server';

import { db } from '@/lib/firebase/admin-sdk';
import { getUser } from '@/lib/auth/server';

interface ActivityLog {
  action: string;
  target: { type: string; id: string; };
  userId: string;
  timestamp: Date;
}

export async function logActivity(action: string, target: { type: string; id: string }) {
    const { user } = await getUser();

    if (!user) {
      console.warn('No authenticated user to log activity for.');
      return;
    }

    try {
      const logEntry: ActivityLog = {
        action,
        target,
        userId: user.uid,
        timestamp: new Date(),
      };

      await db.collection('activityLogs').add(logEntry);

    } catch (error) {
      console.error('Error logging activity:', error);
    }
}

export async function getActivityLogs() {
    try {
        const snapshot = await db.collection('activityLogs').orderBy('timestamp', 'desc').get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching activity logs:', error);
        throw new Error('Could not fetch activity logs.');
    }
}
