import { Container } from "@/components/global/container";
import { Section } from "@/components/global/section";
import { BusinessDetailsClient } from "@/components/negocios/single/business-details-client";

export default function Business() {
  return (
    <Section>
      <Container fullWidth>
        <BusinessDetailsClient />
      </Container>
    </Section>
  )
}
