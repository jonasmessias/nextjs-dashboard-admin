export type Campaign = {
  id: string
  segment: string
  message: string
  client: string
  multiplier: number
  validity: string
  notificationCost: number
  status: CampaignStatus
  business: string
  cnpj: string
  totalValue: number
  createdAt: Date
  updatedAt: Date
}
    

export type CampaignStatus = 'rejected' | 'published' | 'hired'

export type CampaignFormValues = {
  segment: string
  message: string
  clients: string[]
  multiplier: number
  validity: string
  notificationCost: number
}
