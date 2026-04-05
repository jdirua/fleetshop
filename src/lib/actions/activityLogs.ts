'use server';

import { db } from '@/lib/firebase/admin-sdk';
import { getCurrentUser } from '@/lib/auth/server';
import { ActivityLog } from '@/lib/types/activityLog';

export async function logActivity(action: string, target: { type: string; id: string }) {
    const user = await getCurrentUser();

    if (!user) {
      console.warn('No authenticated user to log activity for.');
      return;
    }

    try {
      const logEntry = {
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

export async function getActivityLogs({ page = 1, limit = 15 }: { page?: number; limit?: number } = {}): Promise<{ data: ActivityLog[], totalPages: number }> {
    try {
        const logsRef = db.collection('activityLogs');
        const snapshot = await logsRef.get();
        const totalLogs = snapshot.size;
        const totalPages = Math.ceil(totalLogs / limit);
        const offset = (page - 1) * limit;

        const logsSnapshot = await logsRef.orderBy('timestamp', 'desc').limit(limit).offset(offset).get();

        if (logsSnapshot.empty) {
            return { data: [], totalPages: 0 };
        }

        const data = logsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                action: data.action,
                target: data.target,
                userId: data.userId,
                timestamp: data.timestamp.toDate(), // Firestore Timestamps need to be converted
            };
        }) as ActivityLog[];

        return { data, totalPages };
    } catch (error) {
        console.error('Error fetching activity logs:', error);
        throw new Error('Could not fetch activity logs.');
    }
}
