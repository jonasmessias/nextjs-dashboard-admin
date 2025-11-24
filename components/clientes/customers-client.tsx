'use client'

import { CustomersTable } from "@/components/clientes/customers-table";
import { CustomersTablesSkeleton } from "@/components/clientes/customers-table-skeleton";
import { useUsers } from "@/hooks/use-users";
import type { User } from "@/types/user";

export function CustomersClient() {
  const { data: usersData, isLoading, error } = useUsers('client')
  if (isLoading) {
    return <CustomersTablesSkeleton />
  }

  if (error) {
    return <div>Erro ao carregar clientes</div>
  }

  return <CustomersTable customers={usersData as User[]} />
} 