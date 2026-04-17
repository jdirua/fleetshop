
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin-sdk';
import { WorkOrder } from '@/lib/types/workOrder';

export async function GET() {
  try {
    const workOrdersRef = db.collection('work-orders');
    const snapshot = await workOrdersRef.get();

    if (snapshot.empty) {
      return NextResponse.json({ workOrders: [] });
    }

    const workOrders = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to Date
        ...(data.startDate && { startDate: data.startDate.toDate() }),
        ...(data.completionDate && { completionDate: data.completionDate.toDate() }),
      } as WorkOrder;
    });

    return NextResponse.json({ workOrders });
  } catch (error) {
    console.error('Error fetching work orders:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
