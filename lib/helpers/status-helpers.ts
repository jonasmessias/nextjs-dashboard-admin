import type { CampaignStatus } from '@/types/campaigns'
import type { Status } from '@/types/user'

/**
 * Traduz o status da campanha para português
 */
export function translateStatus(status: CampaignStatus): string {
  switch (status) {
    case 'published':
      return 'Publicado'
    case 'hired':
      return 'Contratado'
    case 'rejected':
      return 'Rejeitado'
    default:
      return status
  }
}

/**
 * Traduz o status do usuário para português
 */
export function translateUserStatus(status: Status): string {
  switch (status) {
    case 'diamond':
      return 'Diamante'
    case 'gold':
      return 'Ouro'
    case 'silver':
      return 'Prata'
    case null:
      return 'Sem status'
    default:
      return 'Sem status'
  }
} 