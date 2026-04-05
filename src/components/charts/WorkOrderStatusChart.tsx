'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Open', value: 38, fill: '#fb923c' }, // Amber 400
  { name: 'In Progress', value: 24, fill: '#60a5fa' }, // Blue 400
  { name: 'On Hold', value: 12, fill: '#a78bfa' }, // Violet 400
  { name: 'Completed', value: 78, fill: '#4ade80' }, // Green 400
  { name: 'Cancelled', value: 5, fill: '#f87171' }, // Red 400
];

export const WorkOrderStatusChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis 
            dataKey="name" 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
        />
        <YAxis 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.1)' }}
            contentStyle={{ 
                background: 'rgba(31, 41, 55, 0.8)', 
                borderColor: 'rgba(255,255,255,0.1)', 
                color: '#d1d5db',
                borderRadius: '0.5rem'
            }} 
        />
        <Legend 
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};