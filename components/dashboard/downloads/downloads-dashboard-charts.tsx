"use client"

import { DownloadsLineChart } from "@/components/dashboard/downloads/downloads-line-chart"
import { DownloadsPieChart } from "@/components/dashboard/downloads/downloads-pie-chart"
import { ContainerCard } from "@/components/global/container-card"
import { DaysSelect } from "@/components/global/days-select"
import { useState } from "react"

export function DownloadsDashboardCharts() {
  const [days, setDays] = useState(30)

  return (
    <>
      <div className="flex justify-end mb-4">
        <DaysSelect value={days} onChange={setDays} />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContainerCard title="Downloads por Periodo" className="w-full border-0">
          <DownloadsLineChart days={days} />
        </ContainerCard>
        <ContainerCard title="Downloads por Origem" className="w-full border-0">
          <DownloadsPieChart days={days} />
        </ContainerCard>
      </div>
    </>
  )
} 