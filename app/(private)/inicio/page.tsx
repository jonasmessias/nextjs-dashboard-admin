import { Container } from "@/components/global/container";
import { Section } from "@/components/global/section";
import { AvatarHomeClient } from "@/components/inicio/avatar-home-client";
import { HomeClient } from "@/components/inicio/home-client";
import { TodayDateOnHome } from "@/components/inicio/today-date-home";

export default function Home() {
    return (
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between">
            <AvatarHomeClient />
            <TodayDateOnHome />
          </div>
          <HomeClient />
        </Container>
      </Section>
    )
}

