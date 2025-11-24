import { Text } from "@/components/global/text";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BonusLevelItem } from "./bonus-level-item";

interface BusinessBonusSectionProps {
  business: {
    diamondMinPoints: number;
    diamondDecrementPoints: number;
    diamondDescription: string;
    goldMinPoints: number;
    goldDecrementPoints: number;
    goldDescription: string;
    silverMinPoints: number;
    silverDecrementPoints: number;
    silverDescription: string;
  };
}

export function BusinessBonusSection({ business }: BusinessBonusSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Text size="huge" weight="extraBold">Bonificação</Text>
      <Card className="p-8 min-h-[566px]">
        <ScrollArea className="h-full max-h-[534px]">
          <div className="h-full grid grid-cols-1 grid-rows-5 justify-center items-center">
            <BonusLevelItem
              level="diamond"
              title="Diamante"
              minPoints={business.diamondMinPoints}
              decrementPoints={business.diamondDecrementPoints}
              description={business.diamondDescription}
            />
            <Separator />
            <BonusLevelItem
              level="gold"
              title="Ouro"
              minPoints={business.goldMinPoints}
              decrementPoints={business.goldDecrementPoints}
              description={business.goldDescription}
            />
            <Separator />
            <BonusLevelItem
              level="silver"
              title="Prata"
              minPoints={business.silverMinPoints}
              decrementPoints={business.silverDecrementPoints}
              description={business.silverDescription}
            />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
} 