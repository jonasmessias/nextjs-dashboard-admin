"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const chartDataAll = [
  { type: "Desconto Direto", impressoes: 25000, cliques: 7000, conversoes: 1800 },
  { type: "Compre 1 Leve 2", impressoes: 9000, cliques: 3200, conversoes: 900 },
  { type: "Cupom Exclusivo", impressoes: 12000, cliques: 3500, conversoes: 700 },
  { type: "Cupom Primeira Compra", impressoes: 20000, cliques: 6000, conversoes: 1500 },
]
const chartData7 = [
  { type: "Desconto Direto", impressoes: 5000, cliques: 1400, conversoes: 400 },
  { type: "Compre 1 Leve 2", impressoes: 2000, cliques: 800, conversoes: 200 },
  { type: "Cupom Exclusivo", impressoes: 3000, cliques: 900, conversoes: 150 },
  { type: "Cupom Primeira Compra", impressoes: 6000, cliques: 1800, conversoes: 400 },
]
const chartData90 = [
  { type: "Desconto Direto", impressoes: 60000, cliques: 18000, conversoes: 4000 },
  { type: "Compre 1 Leve 2", impressoes: 25000, cliques: 9000, conversoes: 2200 },
  { type: "Cupom Exclusivo", impressoes: 35000, cliques: 11000, conversoes: 2000 },
  { type: "Cupom Primeira Compra", impressoes: 50000, cliques: 17000, conversoes: 3500 },
]

export function CampaignsBarMultipleChart({ days = 30 }: { days?: number }) {
  let chartData = chartDataAll;
  if (days === 7) chartData = chartData7;
  else if (days === 90) chartData = chartData90;
  return (
    <div className="w-full bg-black-0 rounded-xl" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          margin={{ left: 14, right: 14, top: 14, bottom: 14 }}
          barCategoryGap={50}
        >
          <CartesianGrid stroke="#fff" vertical={false} />
          <XAxis 
            dataKey="type" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 12 }} 
            height={20}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 26000]}
            ticks={[0, 6500, 13000, 19500, 26000]}
            tickFormatter={v => v.toLocaleString('pt-BR')}
            width={40}
          />
          <Tooltip
            wrapperStyle={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
            formatter={v => Number(v).toLocaleString('pt-BR')}
          />
          <Bar dataKey="impressoes" name="Impressões" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
          <Bar dataKey="cliques" name="Cliques" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={40} />
          <Bar dataKey="conversoes" name="Conversões" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 