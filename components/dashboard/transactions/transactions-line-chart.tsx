"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { date: "01/05", value: 12000, amount: 120 },
  { date: "08/05", value: 14000, amount: 140 },
  { date: "15/05", value: 16000, amount: 160 },
  { date: "22/05", value: 15000, amount: 150 },
  { date: "29/05", value: 17000, amount: 170 },
  { date: "05/06", value: 18500, amount: 185 },
  { date: "12/06", value: 20000, amount: 200 },
  { date: "19/06", value: 21500, amount: 215 },
  { date: "26/06", value: 23000, amount: 230 },
]

export function TransactionsLineChart({ days = 30 }: { days?: number }) {
  let filteredData = chartData;
  if (days === 7) filteredData = chartData.slice(-2);
  else if (days === 30) filteredData = chartData.slice(-6);

  return (
    <div className="w-full bg-black-0 rounded-xl min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData}>
          <CartesianGrid stroke="#eee" vertical={false} />
          <XAxis 
            dataKey="date" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 12 }} 
            padding={{ right: 24, left: 20 }} 
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, 24000]}
            ticks={[0, 6000, 12000, 18000, 24000]}
            tickFormatter={v => v.toLocaleString('pt-BR')}
          />
          <Tooltip 
            formatter={(v, name) => {
              if (name === 'amount') {
                return [v, 'Transações']
              }
              return [`R$ ${Number(v).toLocaleString('pt-BR')}`, 'Valor']
            }}
            wrapperStyle={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          />
          <Line type="monotone" dataKey="value" name="value" stroke="#14b8a6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="amount" name="amount" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 