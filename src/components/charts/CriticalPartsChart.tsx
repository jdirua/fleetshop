'use client';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Batteries', value: 18 },
    { name: 'Brake Pads', value: 25 },
    { name: 'Oil Filters', value: 32 },
    { name: 'Tires', value: 22 },
];

const COLORS = ['#f43f5e', '#3b82f6', '#14b8a6', '#f97316']; // Rose 500, Blue 500, Teal 500, Orange 500

export const CriticalPartsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
      </PieChart>
    </ResponsiveContainer>
  );
};