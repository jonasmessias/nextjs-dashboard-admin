'use client'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { date: "01/05", a: 1100, b: 700, c: 480 },
  { date: "08/05", a: 1300, b: 850, c: 540 },
  { date: "15/05", a: 1500, b: 920, c: 600 },
  { date: "22/05", a: 1600, b: 830, c: 560 },
  { date: "29/05", a: 1800, b: 970, c: 640 },
  { date: "05/06", a: 2000, b: 1000, c: 700 },
  { date: "12/06", a: 2100, b: 1020, c: 760 },
  { date: "19/06", a: 2200, b: 1040, c: 800 },
  { date: "26/06", a: 2200, b: 1320, c: 880 },
];

interface MainMetricsChartProps {
  height?: number;
  days?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = payload[0]?.value;
    const android = payload[1]?.value;
    const ios = payload[2]?.value;
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 8,
        padding: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ fontSize: 12, color: '#222', marginBottom: 4 }}>{label}</div>
        <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 14 }}>{total} <span style={{ fontWeight: 400, color: '#222', fontSize: 12 }}>TOTAL</span></div>
        <div style={{ fontWeight: 700, color: '#14b8a6', fontSize: 13 }}>{android} <span style={{ fontWeight: 400, color: '#222', fontSize: 11 }}>ANDROID</span></div>
        <div style={{ fontWeight: 700, color: '#a78bfa', fontSize: 13 }}>{ios} <span style={{ fontWeight: 400, color: '#222', fontSize: 11 }}>IOS</span></div>
      </div>
    );
  }
  return null;
};

export function DownloadsLineChart({ days = 30 }: MainMetricsChartProps) {
  let numPoints = chartData.length;
  if (days === 7) numPoints = 1;
  else if (days === 30) numPoints = 5;
  else if (days === 90) numPoints = chartData.length;
  const filteredData = chartData.slice(-numPoints);

  return (
  <div className="w-full bg-black-0 rounded-xl min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData}>
          <CartesianGrid stroke="#ffffff" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            padding={{ right: 24, left: 20 }}
            interval={0}
            ticks={filteredData.map(d => d.date)}
            tick={{ fontSize: 12 }}
          />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} ticks={[0, 550, 1100, 1650, 2200]} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="a"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="b"
            stroke="#14b8a6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="c"
            stroke="#a78bfa"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
