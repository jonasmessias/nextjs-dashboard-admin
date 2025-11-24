"use client"

import { ContainerCard } from "@/components/global/container-card"
import { DaysSelect } from "@/components/global/days-select"
import { useState } from "react"
import { CampaignsBarHorizontalChart } from "./campaigns-bar-horizontal-chart"
import { CampaignsBarMultipleChart } from "./campaigns-bar-multiple-chart"

export function CampaignsDashboardCharts() {
  const [days, setDays] = useState(30)

  return (
    <>
      <div className="flex justify-end mb-4">
        <DaysSelect value={days} onChange={setDays} />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContainerCard title="Campanhas Ativas" className="w-full border-0">
          <CampaignsBarHorizontalChart days={days} />
        </ContainerCard>
        <ContainerCard title="Engajamento por Tipo de Oferta" className="w-full border-0">
          <CampaignsBarMultipleChart days={days} />
        </ContainerCard>
      </div>
    </>
  )
} 