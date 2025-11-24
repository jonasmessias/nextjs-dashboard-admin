"use client"

import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer } from "recharts"

interface DownloadsPieChartProps {
  days?: number
}

const chartDataAll = [
  { platform: "Orgânico", downloads: 450, color: "#2563eb" },
  { platform: "Campanhas", downloads: 300, color: "#14b8a6" },
  { platform: "Referral", downloads: 150, color: "#a78bfa" },
  { platform: "Outros", downloads: 100, color: "#f97316" },
]

function getChartData(days: number) {
  if (days === 7) {
    return [
      { platform: "Orgânico", downloads: 90, color: "#2563eb" },
      { platform: "Campanhas", downloads: 60, color: "#14b8a6" },
      { platform: "Referral", downloads: 30, color: "#a78bfa" },
      { platform: "Outros", downloads: 20, color: "#f97316" },
    ]
  }
  if (days === 30) return chartDataAll
  if (days === 90) {
    return [
      { platform: "Orgânico", downloads: 1200, color: "#2563eb" },
      { platform: "Campanhas", downloads: 900, color: "#14b8a6" },
      { platform: "Referral", downloads: 450, color: "#a78bfa" },
      { platform: "Outros", downloads: 300, color: "#f97316" },
    ]
  }
  return chartDataAll
}

// Componente de tooltip customizado que exibe a porcentagem
interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    payload: {
      color: string
    }
  }>
  totalDownloads: number
}

function CustomTooltipContent({ active, payload, totalDownloads }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0]
  const downloads = data.value
  const platform = data.name
  const color = data.payload.color
  const percentage = ((downloads / totalDownloads) * 100).toFixed(1)

  return (
    <div className="border-border/50 bg-background min-w-[8rem] rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <div 
          className="h-2.5 w-2.5 rounded-[2px]" 
          style={{ backgroundColor: color }}
        />
        <span className="font-medium">{platform}</span>
      </div>
      <div className="flex justify-start items-center">
        <span className="text-muted-foreground">Downloads:</span>
        <span className="text-foreground font-mono font-medium tabular-nums">
          {downloads.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Porcentagem:</span>
        <span className="text-foreground font-mono font-medium tabular-nums">
          {percentage}%
        </span>
      </div>
    </div>
  )
}

function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) {
  const RADIAN = Math.PI / 180
  const iR = Number(innerRadius) || 0
  const oR = Number(outerRadius) || 0
  const cX = Number(cx) || 0
  const cY = Number(cy) || 0
  const mA = Number(midAngle) || 0
  const radius = iR + (oR - iR) * 0.5
  const x = cX + radius * Math.cos(-mA * RADIAN)
  const y = cY + radius * Math.sin(-mA * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontWeight="bold"
      fontSize={12}
      style={{ pointerEvents: 'none' }}
    >
      {`${Math.round((percent ?? 0) * 100)}%`}
    </text>
  )
}

export function DownloadsPieChart({ days = 30 }: DownloadsPieChartProps) {
  const chartData = getChartData(days)
  const totalDownloads = chartData.reduce((sum, item) => sum + item.downloads, 0)
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%" minHeight={320}>
        <ChartContainer
          config={{ data: chartData, config: { dataKey: "downloads", nameKey: "platform" } } as ChartConfig}
        >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<CustomTooltipContent totalDownloads={totalDownloads} />}
          />
          <Pie
            data={chartData}
            dataKey="downloads"
            nameKey="platform"
            innerRadius={55}
            outerRadius={110}
            paddingAngle={2}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
} 