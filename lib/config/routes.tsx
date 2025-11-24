import { ChartSpline, Home, Megaphone, Store, UsersRound, type LucideIcon } from 'lucide-react'

export type Route = {
  name: string
  icon?: LucideIcon
  path: string
}

export type Mainroute = Route & { subroutes?: Route[] }

export const ROUTES: Mainroute[] = [
  {
    name: 'Início',
    path: 'inicio',
    icon: Home,
  },
  {
    name: 'Clientes',
    path: 'clientes',
    icon: UsersRound,
  },
  {
    name: 'Negócios',
    path: 'negocios',
    icon: Store,
  },
  {
    name: 'Campanhas',
    path: 'campanhas',
    icon: Megaphone,
  },
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: ChartSpline,
  },
]
