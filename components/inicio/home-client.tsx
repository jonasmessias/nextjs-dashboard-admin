'use client'

import { ContainerCard } from "@/components/global/container-card"
import { CampaignItem } from "@/components/inicio/campaign-item"
import { KPIHome, type KPIHomeProps } from "@/components/inicio/kpi-home"
import { QuickAction } from "@/components/inicio/quick-action"

export function HomeClient() {
  const kpis: KPIHomeProps[] = [
    { label: "Total de clientes ativos", value: 2000, iconName: "UsersRound" },
    { label: "Total de negócios", value: 500, iconName: "Store" },
    { label: "Receita total", value: 350000, iconName: "Star" },
    { label: "Campanhas ativas", value: 15, iconName: "Megaphone" },
  ]

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {kpis.map((kpi: KPIHomeProps, index: number) => (
          <KPIHome
            key={index}
            label={kpi.label}
            value={kpi.value}
            iconName={kpi.iconName}
          />
        ))}
      </div>
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContainerCard
          title="Ações rápidas"
          description="Acesse rapidamente as principais funcionalidades"
          className="w-full lg:max-w-[500px]"
        >
          <div className="w-full flex flex-row gap-4"> 
            <QuickAction title="Clientes" iconName="UsersRound" href="/clientes" />
            <QuickAction title="Negócios" iconName="Store" href="/produtos" />
          </div>
          <QuickAction title="Campanhas" iconName="Megaphone" href="/vendas" />
        </ContainerCard>
        
        <ContainerCard
          title="Campanhas recentes"
          description="Últimas campanhas criadas"
          className="w-full lg:max-w-[500px]"
          contentClassName="overflow-y-auto max-h-[300px] pr-4"
        >
          <CampaignItem title="Campanha 1" createdAt={new Date(Date.now() - 24 * 60 * 60 * 1000)} href="/campanhas/1" />
          <CampaignItem title="Campanha 2" createdAt={new Date(Date.now() - 2 * 60 * 60 * 1000)} href="/campanhas/2" />
          <CampaignItem title="Campanha 3" createdAt={new Date(Date.now() - 30 * 60 * 1000)} href="/campanhas/3" />
          <CampaignItem title="Campanha 4" createdAt={new Date(Date.now() - 5 * 60 * 1000)} href="/campanhas/4" />
          <CampaignItem title="Campanha 5" createdAt={new Date(Date.now() - 10 * 60 * 1000)} href="/campanhas/5" />
          <CampaignItem title="Campanha 6" createdAt={new Date(Date.now() - 15 * 60 * 1000)} href="/campanhas/6" />
          <CampaignItem title="Campanha 7" createdAt={new Date(Date.now() - 20 * 60 * 1000)} href="/campanhas/7" />
          <CampaignItem title="Campanha 8" createdAt={new Date(Date.now() - 25 * 60 * 1000)} href="/campanhas/8" />
          <CampaignItem title="Campanha 9" createdAt={new Date(Date.now() - 30 * 60 * 1000)} href="/campanhas/9" />
          <CampaignItem title="Campanha 10" createdAt={new Date(Date.now() - 35 * 60 * 1000)} href="/campanhas/10" />
        </ContainerCard>
      </div>
    </>
  )
} 