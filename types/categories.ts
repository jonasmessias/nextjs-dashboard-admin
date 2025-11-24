export type BusinessCategory =
  | 'snack_bar'
  | 'pastry_shop'
  | 'restaurant'
  | 'ice_cream_shop'
  | 'gym'
  | 'market'
  | 'pet_shop'
  | 'sports_arena'

export const translateBusinessCategory = (
  category: BusinessCategory
): string => {
  const categories: Record<BusinessCategory, string> = {
    snack_bar: 'Lanchonete',
    pastry_shop: 'Padaria',
    restaurant: 'Restaurante',
    ice_cream_shop: 'Sorveteria',
    gym: 'Academia',
    market: 'Mercado',
    pet_shop: 'Pet Shop',
    sports_arena: 'Arena Esportiva',
  }

  return categories[category]
}

export const businessCategories: Record<BusinessCategory, string> = {
  snack_bar: 'Lanchonete',
  pastry_shop: 'Padaria',
  restaurant: 'Restaurante',
  ice_cream_shop: 'Sorveteria',
  gym: 'Academia',
  market: 'Mercado',
  pet_shop: 'Pet Shop',
  sports_arena: 'Arena Esportiva',
}
