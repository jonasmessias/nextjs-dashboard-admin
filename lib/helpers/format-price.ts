export function formatPrice(value: number): string {
  const valueInReais = value / 100

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInReais)
}
