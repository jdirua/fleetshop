
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WorkOrder } from '@/lib/types';

interface WorkOrderStatusChartProps {
  workOrders: WorkOrder[];
}

export function WorkOrderStatusChart({ workOrders }: WorkOrderStatusChartProps) {
  // Guard against non-array inputs to prevent runtime errors
  if (!Array.isArray(workOrders)) {
    return <div className="flex items-center justify-center h-full"><p className="text-gray-400">No data available for chart.</p></div>;
  }

  const statusCounts = workOrders.reduce((acc, workOrder) => {
    acc[workOrder.status] = (acc[workOrder.status] || 0) + 1;
    return acc;
  }, {} as Record<WorkOrder['status'], number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
      return <div className="flex items-center justify-center h-full"><p className="text-gray-400">No work order data to display.</p></div>
  }

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
