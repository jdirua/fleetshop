'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Legend } from 'recharts';

const mockData = [
  {
    name: 'Brake Pads',
    used: 75,
    fill: '#8884d8',
  },
];

export function PartsConsumptionGauge() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart 
        innerRadius="80%" 
        outerRadius="100%" 
        barSize={10} 
        data={mockData} 
        startAngle={90} 
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey='used'
          angleAxisId={0}
          fill="#8884d8"
        />
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
        <text 
          x="50%" 
          y="50%" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          className="fill-current text-2xl font-semibold"
        >
          {`${mockData[0].used}%`}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
