'use client'

import { getV1RecentCampaigns } from "@/hooks/actions"
import { useQuery } from "@tanstack/react-query"


export function useRecentCampaigns(limit: number = 10) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-v1-recent-campaigns', limit],
    queryFn: () => getV1RecentCampaigns(limit),
  })

  return { data, isLoading, error }
} 