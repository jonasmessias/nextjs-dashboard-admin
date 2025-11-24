import { Container } from "@/components/global/container";
import { Heading } from "@/components/global/heading";
import { Section } from "@/components/global/section";
import { BusinessesClient } from "@/components/negocios/businesses-client";

export default function Businesses() {
  return (
    <Section>
      <Container fullWidth>
        <Heading>Negócios</Heading>
        <BusinessesClient />
      </Container>
    </Section>
  )
}
