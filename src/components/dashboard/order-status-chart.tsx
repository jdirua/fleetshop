'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { name: 'Open', count: 12 },
  { name: 'In Progress', count: 19 },
  { name: 'On Hold', count: 3 },
  { name: 'Completed', count: 42 },
];

// Custom colors for the chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function OrderStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
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
        <Bar dataKey="count" barSize={50} radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
