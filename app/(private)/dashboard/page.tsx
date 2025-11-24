import { KPIDashboard } from "@/components/dashboard/kpi-dashboard";
import { MainMetricsChart } from "@/components/dashboard/main-metrics-chart";
import { MostUseChart } from "@/components/dashboard/most-use-chart";
import { Container } from "@/components/global/container";
import { ContainerCard } from "@/components/global/container-card";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";
import { Text } from "@/components/global/text";

export default function Dashboard() {
  return (
    <Section>
      <Container fullWidth>
        <Heading>Clientes</Heading>
        <Text size="md" className="text-black-100">
         Visão gerral do desempenho do seu clube de benefícios
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPIDashboard
            iconName="Download"
            label="Total de downloads"
            value={45231}
            percentageChange={12}
            comparisonText="vs. período anterior"
            href="/dashboard/downloads"
          />
          <KPIDashboard
            iconName="Loader"
            label="Taxa de retenção"
            value={42.8}
            percentageChange={-2.30}
            comparisonText="vs. período anterior"
            showAsPercentage
            href="/dashboard/retencao"
          />
          <KPIDashboard
            iconName="PackageOpen"
            label="Total de transações"
            value={12543}
            percentageChange={8.20}
            comparisonText="vs. período anterior"
            href="/dashboard/transacoes"
          />
          <KPIDashboard
            iconName="Megaphone"
            label="Taxa de conversão"
            value={28.4}
            percentageChange={5.10}
            comparisonText="vs. período anterior"
            showAsPercentage
            href="/dashboard/campanhas"
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContainerCard
            title="Métricas Principais"
            className="w-full border-0"
          >
            <MainMetricsChart />
          </ContainerCard>
          <ContainerCard
            title="Áreas com Mais Utilização"
            className="w-full border-0"
        >
          <MostUseChart />
        </ContainerCard>
        </div>
      </Container>
    </Section>
  )
}
