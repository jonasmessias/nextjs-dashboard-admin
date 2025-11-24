"use client"


import { RetentionBarChart } from "@/components/dashboard/retention/retention-bar-chart"
import { RetentionLineChart } from "@/components/dashboard/retention/retention-line-chart"
import { ContainerCard } from "@/components/global/container-card"
import { DaysSelect } from "@/components/global/days-select"
import { useState } from "react"

export function RetentionDashboardCharts() {
  const [days, setDays] = useState(30)

  return (
    <>
      <div className="flex justify-end mb-4">
        <DaysSelect value={days} onChange={setDays} />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContainerCard title="Retenção por Período" className="w-full border-0">
          <RetentionLineChart days={days} />
        </ContainerCard>
        <ContainerCard title="Retenção por Tipo de Benefício" className="w-full border-0">
          <RetentionBarChart days={days} />
        </ContainerCard>
      </div>
    </>
  )
} 