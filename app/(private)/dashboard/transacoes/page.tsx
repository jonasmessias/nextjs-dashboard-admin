import { TransactionsDashboardCharts } from "@/components/dashboard/transactions/transactions-dashboard-charts";
import { Container } from "@/components/global/container";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";
import { Text } from "@/components/global/text";

export default function TransactionsPage() {
  return (
    <Section>
      <Container fullWidth>
        <Heading size="huge-2" hasReturnButton>Transações</Heading>
        <Text size="sm" className="text-black-100">
          Análise detalhada das transações e uso de benefícios
        </Text>
        <TransactionsDashboardCharts />
      </Container>
    </Section>
  )
}