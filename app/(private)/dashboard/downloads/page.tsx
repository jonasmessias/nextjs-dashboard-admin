import { DownloadsDashboardCharts } from "@/components/dashboard/downloads/downloads-dashboard-charts";
import { Container } from "@/components/global/container";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";
import { Text } from "@/components/global/text";

export default function DownloadsPage() {
  return (
    <Section>
      <Container fullWidth>
        <Heading size="huge-2" hasReturnButton>Relatório de Downloads</Heading>
        <Text size="sm" className="text-black-100">
          Análise detalhada da performance de aquisição do aplicativo
        </Text>
        <DownloadsDashboardCharts />
      </Container>
    </Section>
  )
}