'use client'

import { getV1Users } from "@/hooks/actions"
import type { UserRole } from "@/types/user"
import { useQuery } from "@tanstack/react-query"

export function useUsers(userRole: UserRole) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-v1-users-clients'],
    queryFn: () => getV1Users(userRole),
  })

  return { data, isLoading, error }
}