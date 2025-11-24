import type { BusinessCategory } from "@/types/categories";
import {
    Cake,
    Coffee,
    Dumbbell,
    IceCream,
    PawPrint,
    ShoppingCart,
    Trophy,
    Utensils
} from "lucide-react";

interface CategoryIconProps {
  category: BusinessCategory;
  className?: string;
}

export function CategoryIcon({ category, className = "text-black-900" }: CategoryIconProps) {
  switch (category) {
    case 'snack_bar':
      return <Coffee size={12} className={className} />;
    case 'pastry_shop':
      return <Cake size={12} className={className} />;
    case 'restaurant':
      return <Utensils size={12} className={className} />;
    case 'ice_cream_shop':
      return <IceCream size={12} className={className} />;
    case 'gym':
      return <Dumbbell size={12} className={className} />;
    case 'market':
      return <ShoppingCart size={12} className={className} />;
    case 'pet_shop':
      return <PawPrint size={12} className={className} />;
    case 'sports_arena':
      return <Trophy size={12} className={className} />;
    default:
      return <Utensils size={12} className={className} />;
  }
} 