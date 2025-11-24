import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'

/**
 * Cliente Axios para requisições autenticadas
 * 
 * Configurado com interceptors para:
 * - Adicionar automaticamente o token JWT em todas as requisições
 * - Tratar erros 401 (não autorizado) redirecionando para login
 * - Limpar cookies de autenticação em caso de falha
 * 
 * Uso:
 * import { api } from '@/lib/axios/authorized-axios'
 * const response = await api.get('/v1/users')
 * 
 * TODO: Configurar variável de ambiente NEXT_PUBLIC_API_DEV_URL
 * TODO: Configurar variável de ambiente NEXT_PUBLIC_API_PRODUCTION_URL
 */

const apiEnv =
  process.env.NEXT_PUBLIC_API_DEV_URL ||
  process.env.NEXT_PUBLIC_API_PRODUCTION_URL

const api = axios.create({
  baseURL: `${apiEnv}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de request: adiciona token JWT automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = getCookie('token_dashboard_app')
    console.log('🔑 Token atual:', token)
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de response: trata erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response)
    if (error.response && error.response.status === 401) {
      // Remove cookies e redireciona para login em caso de não autorizado
      deleteCookie('token_dashboard_app')
      deleteCookie('role_dashboard_app')
      redirect('/login')
    }
    return Promise.reject(error)
  }
)

export { api }
