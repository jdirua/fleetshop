'use client';

import { useState, useEffect } from 'react';
import { getWorkOrders } from "@/lib/actions/workOrders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./columns";
import { useUser } from '@/hooks/useUser';
import { hasPermission } from '@/lib/auth/roles';
import { WorkOrder } from '@/lib/types/workOrder';

export default function WorkOrdersPage() {
  const { user } = useUser();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkOrders() {
      try {
        const fetchedWorkOrders = await getWorkOrders();
        setWorkOrders(fetchedWorkOrders);
      } catch (error) {
        console.error("Failed to fetch work orders:", error);
      }
      setLoading(false);
    }
    loadWorkOrders();
  }, []);

  const canCreate = user && user.role && hasPermission(user.role, 'work-orders:create');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Orders</CardTitle>
        {canCreate && (
          <Link href="/dashboard/work-orders/new">
            <Button>Add Work Order</Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        ) : (
            <DataTable columns={columns} data={workOrders} />
        )}
      </CardContent>
    </Card>
  );
}
