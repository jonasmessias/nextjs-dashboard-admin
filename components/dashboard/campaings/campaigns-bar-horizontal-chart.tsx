"use client"

import { Text } from "@/components/global/text"

const dataAll = [
  { label: "Desconto Farmácia", impressao: 10000, cliques: 2870, percent: 28.7 },
  { label: "Compre 1 leve 2", impressao: 8000, cliques: 3600, percent: 45 },
  { label: "Cupom Primeira Compra", impressao: 18000, cliques: 6300, percent: 35 },
]
const data7 = [
  { label: "Desconto Farmácia", impressao: 2000, cliques: 600, percent: 30 },
  { label: "Compre 1 leve 2", impressao: 1500, cliques: 700, percent: 46.7 },
  { label: "Cupom Primeira Compra", impressao: 4000, cliques: 1200, percent: 30 },
]
const data90 = [
  { label: "Desconto Farmácia", impressao: 30000, cliques: 9000, percent: 30 },
  { label: "Compre 1 leve 2", impressao: 25000, cliques: 11000, percent: 44 },
  { label: "Cupom Primeira Compra", impressao: 40000, cliques: 14000, percent: 35 },
]

export function CampaignsBarHorizontalChart({ days = 30 }: { days?: number }) {
  let data = dataAll;
  if (days === 7) data = data7;
  else if (days === 90) data = data90;
  return (
    <div className="w-full space-y-6 p-2 pt-0">
      {data.map((item) => (
        <div key={item.label} className="space-y-2 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <Text size="sm" weight="semibold" tag="h4">{item.label}</Text>
              <div className="flex items-center gap-2 text-sm text-black-100">
                <Text size="sm" className="text-black-100">{item.impressao.toLocaleString('pt-BR')} impressões</Text>
                <span>•</span>
                <Text size="sm" className="text-black-100">{item.cliques.toLocaleString('pt-BR')} cliques</Text>
              </div>
            </div>
            <div className="ml-auto border px-2 py-1 rounded-full">
              <Text size="xs" weight="semibold" className="text-xs font-semibold text-foreground">
                CTR: {item.percent}%
              </Text>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="bg-blue-300 h-full transition-all duration-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 