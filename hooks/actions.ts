import { api } from "@/lib/axios/authorized-axios"
import type { Campaign } from "@/types/campaigns"
import type { Business, User, UserRole } from "@/types/user"

export const getV1BusinessById = async (id: string): Promise<Business> => {
  const response = await api.get(`/v1/business/${id}`)
  return response.data
} 

export const getV1Me = async (): Promise<User> => {
  const response = await api.get("/v1/me")
  return response.data
}

export const getV1Users = async (role?: UserRole): Promise<User[]> => {
  const params = role ? { role } : {}
  const response = await api.get("/v1/users", { params })
  return response.data
}

export const getV1RecentCampaigns = async (limit: number = 10): Promise<Campaign[]> => {
  const response = await api.get("/v1/campaigns/recent", { params: { limit } })
  return response.data
}
