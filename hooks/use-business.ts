'use client'

import { getV1BusinessById } from "@/hooks/actions"
import { useQuery } from "@tanstack/react-query"

export function useBusiness(id: string) {
  return useQuery({
    queryKey: ['get-v1-business', id],
    queryFn: () => getV1BusinessById(id),
    enabled: !!id,
  })
} 