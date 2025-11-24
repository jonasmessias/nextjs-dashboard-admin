'use client'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { date: "01/05", downloads: 1100, transacoes: 400, retencoes: 200 },
  { date: "08/05", downloads: 1300, transacoes: 450, retencoes: 220 },
  { date: "15/05", downloads: 1500, transacoes: 420, retencoes: 210 },
  { date: "22/05", downloads: 1600, transacoes: 430, retencoes: 230 },
  { date: "29/05", downloads: 1800, transacoes: 470, retencoes: 250 },
  { date: "05/06", downloads: 2000, transacoes: 500, retencoes: 270 },
  { date: "12/06", downloads: 2100, transacoes: 520, retencoes: 280 },
  { date: "19/06", downloads: 2200, transacoes: 540, retencoes: 290 },
  { date: "26/06", downloads: 2400, transacoes: 580, retencoes: 300 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const downloads = payload[0]?.value;
    const transacoes = payload[1]?.value;
    const retencoes = payload[2]?.value;
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 8,
        padding: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontFamily: 'var(--font-manrope), Manrope, sans-serif'
      }}>
        <div style={{ fontSize: 12, color: '#222', marginBottom: 4 }}>{label}</div>
        <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 14 }}>{downloads} <span style={{ fontWeight: 400, color: '#222', fontSize: 12 }}>DOWNLOADS</span></div>
        <div style={{ fontWeight: 700, color: '#14b8a6', fontSize: 13 }}>{transacoes} <span style={{ fontWeight: 400, color: '#222', fontSize: 11 }}>TRANSAÇÕES</span></div>
        <div style={{ fontWeight: 700, color: '#a78bfa', fontSize: 13 }}>{retencoes} <span style={{ fontWeight: 400, color: '#222', fontSize: 11 }}>RETENÇÕES</span></div>
      </div>
    );
  }
  return null;
};

export function MainMetricsChart() {
  return (
    <div className="w-full bg-black-0 rounded-xl min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ffffff" vertical={false} />
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="transacoes"
            stroke="#14b8a6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="retencoes"
            stroke="#a78bfa"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
