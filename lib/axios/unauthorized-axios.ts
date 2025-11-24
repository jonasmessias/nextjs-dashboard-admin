import axios from 'axios'

/**
 * Cliente Axios para requisições públicas (não autenticadas)
 * 
 * Use este cliente para endpoints que não requerem autenticação:
 * - Login
 * - Registro
 * - Recuperação de senha
 * - Endpoints públicos
 * 
 * Uso:
 * import { unapi } from '@/lib/axios/unauthorized-axios'
 * const response = await unapi.post('/v1/login', { email })
 * 
 * TODO: Configurar variável de ambiente NEXT_PUBLIC_API_DEV_URL
 * TODO: Configurar variável de ambiente NEXT_PUBLIC_API_PRODUCTION_URL
 */

const apiEnv =
  process.env.NEXT_PUBLIC_API_DEV_URL ||
  process.env.NEXT_PUBLIC_API_PRODUCTION_URL

const unapi = axios.create({
  baseURL: `${apiEnv}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { unapi }
