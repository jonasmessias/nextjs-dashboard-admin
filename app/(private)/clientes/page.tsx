import { CustomersClient } from "@/components/clientes/customers-client";
import { Container } from "@/components/global/container";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";

export default function Customers() {
  return (
    <Section>
      <Container fullWidth>
        <Heading>Clientes</Heading>
        <CustomersClient />
      </Container>
    </Section>
  )
}
