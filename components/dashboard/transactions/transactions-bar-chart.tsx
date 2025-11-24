"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { type: "Farmácias", value: 85000 },
  { type: "Academias", value: 67000 },
  { type: "Restaurantes", value: 35000 },
  { type: "Petshop", value: 27000 },
  { type: "Pub", value: 18000 },
];

export function TransactionsBarChart({ days = 30 }: { days?: number }) {
  let filteredData = chartData;
  if (days === 7) {
    filteredData = [
      { type: "Farmácias", value: 30000 },
      { type: "Academias", value: 25000 },
      { type: "Restaurantes", value: 12000 },
      { type: "Petshop", value: 9000 },
      { type: "Pub", value: 6000 },
    ];
  } else if (days === 90) {
    filteredData = [
      { type: "Farmácias", value: 120000 },
      { type: "Academias", value: 95000 },
      { type: "Restaurantes", value: 60000 },
      { type: "Petshop", value: 40000 },
      { type: "Pub", value: 25000 },
    ];
  }
  return (
    <div className="w-full bg-black-0 rounded-xl" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData}>
          <CartesianGrid stroke="#eee" vertical={false} />
          <XAxis dataKey="type" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 100000]}
            ticks={[0, 25000, 50000, 75000, 100000]}
            tickFormatter={v => `R$ ${Number(v).toLocaleString('pt-BR')}`}
            width={90}
          />
          <Tooltip 
            formatter={v => `R$ ${Number(v).toLocaleString('pt-BR')}`}
            wrapperStyle={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          />
          <Bar dataKey="value" name="Valor" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 