import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware de autenticação e autorização
 * 
 * Este middleware protege rotas privadas e gerencia o fluxo de autenticação.
 * Está preparado para integração com API backend através de JWT tokens.
 * 
 * Cookies utilizados:
 * - token_dashboard_app: JWT token de autenticação
 * - role_dashboard_app: Role do usuário (admin/business/client)
 * 
 * TODO: Integrar com API de validação de token
 * TODO: Adicionar refresh token automático
 */

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token_dashboard_app')?.value
  const role = request.cookies.get('role_dashboard_app')?.value
  const pathname = request.nextUrl.pathname
  
  // Rotas públicas - acessíveis sem autenticação
  const publicRoutes = ['/login']

  // Rotas privadas - requerem autenticação
  const privateRoutes = [
    '/inicio',
    '/clientes', 
    '/negocios',
    '/campanhas',
    '/dashboard',
  ]

  // Redireciona usuários autenticados da página de login para o início
  if (pathname === '/login' && token && role) {
    return NextResponse.redirect(new URL('/inicio', request.url))
  }

  // Permite acesso a rotas públicas
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Valida autenticação - redireciona para login se não houver token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Valida autorização - redireciona para login se não houver role
  if (!role) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // TODO: Adicionar validação de token com backend
  // TODO: Verificar permissões específicas por role para cada rota
  
  // Permite acesso a rotas privadas para usuários autenticados
  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Rota não encontrada - redireciona para início
  return NextResponse.redirect(new URL('/inicio', request.url))
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
