import { differenceInDays, differenceInHours, differenceInMonths, differenceInWeeks, differenceInYears, format, isAfter, isBefore, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata uma data para o formato brasileiro (dd/MM/yyyy)
 * @param date - Data a ser formatada (string ou Date)
 * @returns String formatada
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, "dd/MM/yyyy", { locale: ptBR })
}

/**
 * Formata uma data para o formato brasileiro com hora (dd/MM/yyyy HH:mm)
 * @param date - Data a ser formatada (string ou Date)
 * @returns String formatada
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, "dd/MM/yyyy HH:mm", { locale: ptBR })
}

/**
 * Calcula e formata o tempo restante até uma data de expiração
 * @param expirationDate - Data de expiração
 * @returns String formatada com o tempo restante
 */
export function formatTimeUntilExpiration(expirationDate: Date | string): string {
  const now = new Date()
  const expiration = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate

  // Se a data já expirou
  if (isBefore(expiration, now)) {
    return 'Expirado'
  }

  // Se a data é hoje (menos de 24 horas)
  const hoursRemaining = differenceInHours(expiration, now)
  
  if (hoursRemaining < 1) {
    const minutesRemaining = Math.ceil((expiration.getTime() - now.getTime()) / (1000 * 60))
    return `${minutesRemaining} min`
  }
  
  if (hoursRemaining < 24) {
    return hoursRemaining === 1 ? '1 hora' : `${hoursRemaining} horas`
  }

  // Dias
  const daysRemaining = differenceInDays(expiration, now)
  if (daysRemaining < 7) {
    return daysRemaining === 1 ? '1 dia' : `${daysRemaining} dias`
  }

  // Semanas
  const weeksRemaining = differenceInWeeks(expiration, now)
  if (weeksRemaining < 4) {
    return weeksRemaining === 1 ? '1 semana' : `${weeksRemaining} semanas`
  }

  // Meses
  const monthsRemaining = differenceInMonths(expiration, now)
  if (monthsRemaining < 12) {
    return monthsRemaining === 1 ? '1 mês' : `${monthsRemaining} meses`
  }

  // Anos
  const yearsRemaining = differenceInYears(expiration, now)
  return yearsRemaining === 1 ? '1 ano' : `${yearsRemaining} anos`
}

/**
 * Calcula e formata o tempo relativo desde uma data de criação
 * @param createdAt - Data de criação
 * @returns String formatada com o tempo relativo
 */
export function formatRelativeTime(createdAt: Date | string): string {
  const now = new Date()
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt

  // Se a data é no futuro (erro de data)
  if (isAfter(createdDate, now)) {
    return 'Data inválida'
  }

  // Minutos
  const minutesAgo = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60))
  if (minutesAgo < 1) {
    return 'Criado agora'
  }
  
  if (minutesAgo < 60) {
    return minutesAgo === 1 ? 'Criado há 1 minuto' : `Criado há ${minutesAgo} minutos`
  }

  // Horas
  const hoursAgo = Math.floor(minutesAgo / 60)
  if (hoursAgo < 24) {
    return hoursAgo === 1 ? 'Criado há 1 hora' : `Criado há ${hoursAgo} horas`
  }

  // Dias
  const daysAgo = Math.floor(hoursAgo / 24)
  if (daysAgo < 7) {
    return daysAgo === 1 ? 'Criado há 1 dia' : `Criado há ${daysAgo} dias`
  }

  // Semanas
  const weeksAgo = Math.floor(daysAgo / 7)
  if (weeksAgo < 4) {
    return weeksAgo === 1 ? 'Criado há 1 semana' : `Criado há ${weeksAgo} semanas`
  }

  // Meses
  const monthsAgo = Math.floor(daysAgo / 30)
  if (monthsAgo < 12) {
    return monthsAgo === 1 ? 'Criado há 1 mês' : `Criado há ${monthsAgo} meses`
  }

  // Anos
  const yearsAgo = Math.floor(daysAgo / 365)
  return yearsAgo === 1 ? 'Criado há 1 ano' : `Criado há ${yearsAgo} anos`
}

/**
 * Calcula e formata o tempo restante baseado em tempo relativo do banco
 * @param createdAt - Data de criação
 * @param relativeExpiration - Tempo relativo de expiração (ex: "30d", "15d")
 * @returns String formatada com o tempo restante
 */
export function formatRelativeExpiration(createdAt: Date | string, relativeExpiration: string): string {
  const now = new Date()
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt
  
  // Extrai o número de dias
  const daysToAdd = parseInt(relativeExpiration.replace(/\D/g, '')) || 30
  
  // Calcula a data de expiração
  const expirationDate = new Date(createdDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))
  
  // Se já expirou
  if (expirationDate < now) {
    return 'Expirado'
  }

  // Calcula dias restantes
  const diffInDays = Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return 'Expira hoje'
  }
  
  return diffInDays === 1 ? '1 dia' : `${diffInDays} dias`
}

/**
 * Verifica se uma data já expirou
 */
export function isRelativeExpired(createdAt: Date | string, relativeExpiration: string): boolean {
  const now = new Date()
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt
  const daysToAdd = parseInt(relativeExpiration.replace(/\D/g, '')) || 30
  const expirationDate = new Date(createdDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))
  
  return expirationDate < now
}

/**
 * Verifica se está próximo de expirar (≤ 7 dias)
 */
export function isNearRelativeExpiration(createdAt: Date | string, relativeExpiration: string): boolean {
  const now = new Date()
  const createdDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt
  const daysToAdd = parseInt(relativeExpiration.replace(/\D/g, '')) || 30
  const expirationDate = new Date(createdDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000))
  
  if (expirationDate < now) return false
  
  const diffInDays = Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diffInDays <= 7
}

/**
 * Verifica se uma data está próxima de expirar (dentro de 7 dias)
 * @param expirationDate - Data de expiração
 * @returns true se está próximo de expirar
 */
export function isNearExpiration(expirationDate: Date | string): boolean {
  const now = new Date()
  const expiration = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate
  
  if (isBefore(expiration, now)) {
    return false // Já expirou
  }
  
  const daysRemaining = differenceInDays(expiration, now)
  return daysRemaining <= 7
}

/**
 * Verifica se uma data já expirou
 * @param expirationDate - Data de expiração
 * @returns true se já expirou
 */
export function isExpired(expirationDate: Date | string): boolean {
  const now = new Date()
  const expiration = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate
  
  return isBefore(expiration, now)
}