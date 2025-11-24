import type { BusinessCategory } from "@/types/categories"

export type User = {
  id: string
  role: UserRole
  name?: string
  email?: string
  phone?: string
  cpf?: string
  birtDate?: string
  document?: File | null
  imageUrl?: string | null
  coverImageUrl?: string | null
  city?: string
  state?: string
  Business?: Business
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}

export type Business = {
  id: string
  name: string
  cnpj: string
  category: BusinessCategory
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  description: string
  imageUrl: string | null | undefined
  diamondMinPoints: number
  diamondDecrementPoints: number
  diamondDescription: string
  goldMinPoints: number
  goldDecrementPoints: number
  goldDescription: string
  silverMinPoints: number
  silverDecrementPoints: number
  silverDescription: string
  galleryImagesUrls: string[]
  stripeAccountId: string | null | undefined
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
  ownerId: string
  owner: User
  // Clients are User objects with role 'client' - relationship not implemented yet
  clients?: User[]
  comment?: BusinessComment[]
  Transaction?: Transaction[]
}

export type BusinessComment = {
  id: string
  content: string
  reply?: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  userId: string
  businessId: string
  transactionId: string
  user: User
}

export type UserRole = 'client' | 'business' | 'admin'
export type Status = 'diamond' | 'gold' | 'silver' | null

export type Transaction = {
  id: string
  price: number
  points: number
  status: 'approved' | 'rejected' | 'pending'
  paymentMethod: string | null
  paymentStatus: 'paid' | 'unpaid' | 'pending'
  paymentId: string | null
  paymentUrl: string | null
  paymentDate: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  userId: string
  businessId: string
  user?: User
}
