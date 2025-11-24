"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { type: "Farmácias", retention: 68 },
  { type: "Academias", retention: 62 },
  { type: "Restaurantes", retention: 52 },
  { type: "Petshop", retention: 48 },
  { type: "Pub", retention: 45 },
]

export function RetentionBarChart({ days = 30 }: { days?: number }) {
  let filteredData = chartData;
  if (days === 7) {
    filteredData = [
      { type: "Farmácias", retention: 70 },
      { type: "Academias", retention: 65 },
      { type: "Restaurantes", retention: 55 },
      { type: "Petshop", retention: 50 },
      { type: "Pub", retention: 48 },
    ];
  } else if (days === 90) {
    filteredData = [
      { type: "Farmácias", retention: 66 },
      { type: "Academias", retention: 60 },
      { type: "Restaurantes", retention: 50 },
      { type: "Petshop", retention: 45 },
      { type: "Pub", retention: 42 },
    ];
  }
  return (
    <div className="w-full bg-black-0 rounded-xl" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData}>
          <CartesianGrid stroke="#eee" vertical={false} />
          <XAxis dataKey="type" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} domain={[0, 80]} tickFormatter={v => `${v}%`} />
          <Tooltip 
            formatter={v => `${v}%`}
            wrapperStyle={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          />
          <Bar dataKey="retention" name="Retenção" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 