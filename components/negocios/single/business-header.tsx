import { AvatarProfile } from "@/components/global/avatar";
import { CategoryIcon } from "@/components/global/category-icons";
import { Text } from "@/components/global/text";
import { Badge } from "@/components/ui/badge";
import type { BusinessCategory } from "@/types/categories";
import { translateBusinessCategory } from "@/types/categories";
import { MapPin } from "lucide-react";

interface BusinessHeaderProps {
  business: {
    name: string;
    imageUrl: string;
    address: string;
    city: string;
    state: string;
    description: string;
    category: BusinessCategory;
  };
}

export function BusinessHeader({ business }: BusinessHeaderProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-start gap-4">
        <AvatarProfile avatarUrl={business.imageUrl} size="106px" />
        <div className="flex flex-col gap-4">
          <Text size="huge" weight="extraBold">{business.name}</Text>
          <div className="flex items-center justify-start gap-2">
            <MapPin size={20} className="text-pink-300" />
            <Text size="sm">{business.address}, {business.city}, {business.state}</Text>
          </div>
          <Badge variant="business-category">
            <CategoryIcon category={business.category} />
            {translateBusinessCategory(business.category)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Text size="sm" weight="bold">Descrição</Text>
        <Text size="sm">{business.description}</Text>
      </div>
    </div>
  );
} 