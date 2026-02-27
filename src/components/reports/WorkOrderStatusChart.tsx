
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WorkOrder } from '@/lib/types';

interface WorkOrderStatusChartProps {
  workOrders: WorkOrder[];
}

export function WorkOrderStatusChart({ workOrders }: WorkOrderStatusChartProps) {
  const data = Object.entries(
    workOrders.reduce((acc, workOrder) => {
      acc[workOrder.status] = (acc[workOrder.status] || 0) + 1;
      return acc;
    }, {} as Record<WorkOrder['status'], number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
