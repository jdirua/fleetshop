
'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Vehicle } from '@/lib/types';

interface VehicleStatusChartProps {
  vehicles: Vehicle[];
}

const COLORS = { 
  active: '#4CAF50',
  'in-shop': '#FFC107', 
  decommissioned: '#F44336' 
};

export function VehicleStatusChart({ vehicles }: VehicleStatusChartProps) {
  // Guard against non-array inputs to prevent runtime errors
  if (!Array.isArray(vehicles)) {
    // Return null or a placeholder to avoid crashing
    return <div className="flex items-center justify-center h-full"><p className="text-gray-400">No data available for chart.</p></div>;
  }

  const statusCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
    return acc;
  }, {} as Record<Vehicle['status'], number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
      return <div className="flex items-center justify-center h-full"><p className="text-gray-400">No vehicle data to display.</p></div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
