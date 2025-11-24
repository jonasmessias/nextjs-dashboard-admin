import { CampaignsDashboardCharts } from "@/components/dashboard/campaings/campaigns-dashboard-charts";
import { Container } from "@/components/global/container";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";
import { Text } from "@/components/global/text";

export default function CampaignsPage() {
  return (
    <Section>
      <Container fullWidth>
        <Heading size="huge-2" hasReturnButton>Engajamento em Campanhas</Heading>
        <Text size="sm" className="text-black-100">
          Análise detalhada da eficácia das campanhas de marketing
        </Text>
        <CampaignsDashboardCharts />
      </Container>
    </Section>
  )
}