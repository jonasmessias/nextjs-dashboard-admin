"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "Jan", retention: 42 },
  { month: "Fev", retention: 46 },
  { month: "Mar", retention: 48 },
  { month: "Abr", retention: 45 },
  { month: "Mai", retention: 43 },
  { month: "Jun", retention: 46 },
  { month: "Jul", retention: 48 },
  { month: "Ago", retention: 50 },
  { month: "Set", retention: 52 },
  { month: "Out", retention: 51 },
  { month: "Nov", retention: 53 },
  { month: "Dez", retention: 55 },
]

export function RetentionLineChart({ days = 30 }: { days?: number }) {
  const filteredData = days === 7 ? chartData.slice(-2) : days === 30 ? chartData.slice(-6) : chartData
  return (
    <div className="w-full bg-black-0 rounded-xl min-h-[320px]" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData}>
          <CartesianGrid stroke="#eee" vertical={false} />
          <XAxis 
            dataKey="month" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 12 }} 
            padding={{ right: 24, left: 20 }}  
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 12 }} 
            domain={[0, 60]} 
            tickFormatter={v => `${v}%`} 
          />
          <Tooltip 
            formatter={v => `${v}%`}
            wrapperStyle={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          />
          <Line 
            type="monotone" 
            dataKey="retention" 
            name="Retenção"
            stroke="#2563eb" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 