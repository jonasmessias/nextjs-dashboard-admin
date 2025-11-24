"use client"

import { TransactionsBarChart } from "@/components/dashboard/transactions/transactions-bar-chart"
import { TransactionsLineChart } from "@/components/dashboard/transactions/transactions-line-chart"
import { ContainerCard } from "@/components/global/container-card"
import { DaysSelect } from "@/components/global/days-select"
import { useState } from "react"

export function TransactionsDashboardCharts() {
  const [days, setDays] = useState(30)

  return (
    <>
      <div className="flex justify-end mb-4">
        <DaysSelect value={days} onChange={setDays} />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContainerCard title="Transações por Período" className="w-full border-0">
          <TransactionsLineChart days={days} />
        </ContainerCard>
        <ContainerCard title="Transações por Tipo de Benefício" className="w-full border-0">
          <TransactionsBarChart days={days} />
        </ContainerCard>
      </div>
    </>
  )
} 