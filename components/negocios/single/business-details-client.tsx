'use client'

import { BusinessDetails } from '@/components/negocios/single/business-details'
import { BusinessDetailsSkeleton } from '@/components/negocios/single/business-details-skeleton'
import { useBusiness } from '@/hooks/use-business'
import { useParams } from 'next/navigation'

export function BusinessDetailsClient() {
  const params = useParams()
  const businessId = params.id as string

  const { data: business, isLoading, error } = useBusiness(businessId)

  if (isLoading) {
    return <BusinessDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <h3>Erro ao carregar detalhes do negócio</h3>
        <p>ID: {businessId}</p>
        <p>Erro: {error.message || 'Erro desconhecido'}</p>
      </div>
    )
  }

  if (!business) {
    return <div>Negócio não encontrado</div>
  }

  return <BusinessDetails business={business} />
} 