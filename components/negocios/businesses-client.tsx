'use client'

import { BusinessesTable } from "@/components/negocios/businesses-table"
import { BusinessesTableSkeleton } from "@/components/negocios/businesses-table-skeleton"
import { useUsers } from "@/hooks/use-users"
import type { User } from "@/types/user"

export function BusinessesClient() {
  const { data: usersData, isLoading, error } = useUsers('business')
  if (isLoading) {
    return <BusinessesTableSkeleton />
  }

  if (error) {
    return <div>Erro ao carregar negócios</div>
  }

  return <BusinessesTable businesses={usersData as User[]} />
} 