import { db } from "@/lib/firebase/admin-sdk";

export async function getDashboardData() {
  'use server';

  try {
    // We can use Promise.all to fetch all data in parallel for efficiency
    const [vehiclesSnapshot, workOrdersSnapshot, inventorySnapshot, overdueServicesSnapshot] = await Promise.all([
      db.collection('vehicles').get(),
      db.collection('workOrders').where('status', '==', 'in-progress').get(),
      db.collection('inventory').get(), // No direct way to compare two fields in Firestore, so we filter in code
      db.collection('vehicles').where('nextService', '<', new Date()).get()
    ]);

    // Filter inventory items where quantity is less than or equal to reorderPoint
    const lowStockItems = inventorySnapshot.docs.filter(doc => {
      const data = doc.data();
      return data.quantity <= data.reorderPoint;
    }).length;

    // Return the aggregated data
    return {
      totalVehicles: vehiclesSnapshot.size,
      activeWorkOrders: workOrdersSnapshot.size,
      lowStockItems: lowStockItems,
      overdueServices: overdueServicesSnapshot.size,
      error: null,
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // In case of an error, return a default state with the error message
    return {
      totalVehicles: 0,
      activeWorkOrders: 0,
      lowStockItems: 0,
      overdueServices: 0,
      error: "Failed to fetch dashboard data. Please try again later.",
    };
  }
}
