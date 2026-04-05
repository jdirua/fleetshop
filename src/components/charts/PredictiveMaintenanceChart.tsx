'use client';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', prediction: 28, actual: 25 },
  { name: 'Feb', prediction: 35, actual: 32 },
  { name: 'Mar', prediction: 42, actual: 48 },
  { name: 'Apr', prediction: 55, actual: 50 },
  { name: 'May', prediction: 62, actual: 58 },
  { name: 'Jun', prediction: 75, actual: 70 },
];

export const PredictiveMaintenanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
          </linearGradient>
        </defs>
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
        <Area type="monotone" dataKey="prediction" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPrediction)" />
        <Area type="monotone" dataKey="actual" stroke="#fbbf24" fillOpacity={1} fill="url(#colorActual)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};