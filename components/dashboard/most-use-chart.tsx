'use client'

import { Text } from "@/components/global/text";
import { Progress } from "@/components/ui/progress";

const data = [
  { label: "Farmácias", value: 3245, percent: 30 },
  { label: "Academias", value: 2876, percent: 26 },
  { label: "Restaurantes", value: 1987, percent: 18 },
  { label: "Petshop", value: 1432, percent: 13 },
  { label: "Pub", value: 1250, percent: 11 },
];

export function MostUseChart() {
  return (
    <div className="w-full space-y-4">
      {data.map((item) => (
        <div key={item.label} className="w-full">
          <div className="flex items-center justify-between mb-1">
            <div>
              <Text size="sm" weight="bold">{item.label}</Text>
              <Text size="xs" className="text-black-100">{item.value} transações</Text>
            </div>
            <Text size="sm" weight="bold">{item.percent}%</Text>
          </div>
          <Progress value={item.percent} />
        </div>
      ))}
    </div>
  );
}
