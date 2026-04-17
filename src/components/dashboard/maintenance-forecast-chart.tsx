'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 28 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 42 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 55 },
  { name: 'Aug', value: 70 },
  { name: 'Sep', value: 65 },
  { name: 'Oct', value: 80 },
  { name: 'Nov', value: 75 },
  { name: 'Dec', value: 90 },
];

export default function MaintenanceForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: 'hsla(var(--muted), 0.5)' }}
          contentStyle={{
            background: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
          }}
        />
        <Legend iconSize={10} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorValue)"
          animationBegin={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
