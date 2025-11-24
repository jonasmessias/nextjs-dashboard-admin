import { RetentionDashboardCharts } from "@/components/dashboard/retention/retention-dashboard-charts";
import { Container } from "@/components/global/container";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";
import { Text } from "@/components/global/text";

export default function RetentionPage() {
  return (
    <Section>
      <Container fullWidth>
        <Heading size="huge-2" hasReturnButton>Retenção de Usuários</Heading>
        <Text size="sm" className="text-black-100">
          Análise detalhada do comportamento de retorno dos usuários
        </Text>
        <RetentionDashboardCharts />
      </Container>
    </Section>
  )
}