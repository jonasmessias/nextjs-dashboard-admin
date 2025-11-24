'use client'

import { getV1Me } from "@/hooks/actions"
import { useQuery } from "@tanstack/react-query"

export function useMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-v1-me'],
    queryFn: () => getV1Me(),
  })

  return { data, isLoading, error }
} 