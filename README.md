# 📊 Dashboard Admin

> Painel administrativo full-stack com autenticação JWT, gerenciamento de usuários e dashboards analíticos

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)

## 🚀 Sobre o Projeto

Dashboard Admin é uma aplicação full-stack moderna desenvolvida com Next.js 15, React 19 e TypeScript. Conta com sistema completo de autenticação JWT, gerenciamento de usuários, campanhas e análises de dados através de dashboards interativos.

### ✨ Características Principais

- 🔐 **Autenticação JWT** - Sistema seguro de login com tokens e gerenciamento de sessão
- 👥 **Gestão de Usuários** - CRUD completo com diferentes níveis de permissão (Admin, Business, Client)
- 📈 **Dashboards Analíticos** - Visualizações interativas com gráficos e KPIs
- 🎯 **Gestão de Campanhas** - Sistema completo para gerenciamento de campanhas marketing
- 💼 **Gestão de Negócios** - Controle de clientes e transações
- 🎨 **UI/UX Moderna** - Interface responsiva com Radix UI e Tailwind CSS
- ⚡ **Performance Otimizada** - Server Components, React Query e lazy loading
- 🏗️ **Arquitetura Limpa** - Repository Pattern e separação de responsabilidades

## 🛠️ Tecnologias

### Frontend
- **Next.js 15.3** - Framework React com App Router e Server Components
- **React 19** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **TailwindCSS 4.1** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e customizáveis
- **React Hook Form + Zod** - Validação e gerenciamento de formulários
- **TanStack Query** - Gerenciamento de estado assíncrono e cache
- **TanStack Table** - Tabelas avançadas com sorting, filtering e pagination
- **Recharts** - Biblioteca de gráficos responsivos
- **Axios** - Cliente HTTP com interceptors
- **date-fns** - Manipulação de datas
- **Sonner** - Notificações toast elegantes

### Tooling & DevEx
- **ESLint** - Linting e qualidade de código
- **PostCSS** - Transformações CSS
- **Prettier** - Formatação de código

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/kassiogluten/dashboard-app.git

# Entre no diretório
cd dashboard-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
NEXT_PUBLIC_API_DEV_URL=http://localhost:4000
NEXT_PUBLIC_API_PRODUCTION_URL=https://api.seudominio.com
```

## 🚀 Como Executar

```bash
# Ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Linting
npm run lint
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
dashboard-app/
├── app/                      # App Router do Next.js
│   ├── (private)/           # Rotas autenticadas
│   │   ├── inicio/          # Página inicial do dashboard
│   │   ├── clientes/        # Gestão de clientes
│   │   ├── negocios/        # Gestão de negócios
│   │   ├── campanhas/       # Gestão de campanhas
│   │   └── dashboard/       # Dashboards analíticos
│   ├── (public)/            # Rotas públicas
│   │   └── login/           # Página de login
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Página inicial
│   └── providers.tsx        # Context Providers
├── components/              # Componentes React
│   ├── ui/                  # Componentes base (Radix UI)
│   ├── global/              # Componentes reutilizáveis
│   ├── clientes/            # Componentes de clientes
│   ├── negocios/            # Componentes de negócios
│   ├── campanhas/           # Componentes de campanhas
│   ├── dashboard/           # Componentes de dashboard
│   └── login/               # Componentes de login
├── hooks/                   # Custom React Hooks
├── lib/                     # Bibliotecas e utilitários
│   ├── axios/               # Configuração Axios
│   ├── config/              # Configurações
│   └── utils.ts             # Funções utilitárias
├── schemas/                 # Schemas de validação (Zod)
├── types/                   # Definições TypeScript
└── middleware.ts            # Middleware de autenticação
```

## 🏗️ Arquitetura

### Repository Pattern

O projeto utiliza o Repository Pattern para abstrair a camada de dados:

- **Hooks customizados** (`use-users`, `use-business`, `use-dashboard`) encapsulam a lógica de fetching
- **TanStack Query** gerencia cache, revalidação e estados de loading/error
- **Axios interceptors** tratam autenticação e erros globalmente

### Autenticação & Autorização

```typescript
// Middleware protege rotas privadas
middleware.ts → Valida JWT e role

// Cookies seguros armazenam credenciais
token_dashboard_app → JWT Token
role_dashboard_app → User Role (admin/business/client)

// Interceptors gerenciam tokens automaticamente
authorized-axios.ts → Adiciona Bearer token em requests
```

### Server & Client Components

- **Server Components** (padrão) para melhor performance e SEO
- **Client Components** (`'use client'`) apenas quando necessário (interatividade, hooks)

## 🎨 Componentes UI

### Componentes Base (Radix UI)

- `Avatar` - Avatares de usuário com fallback
- `Button` - Botões com variantes e tamanhos
- `Dialog` - Modais acessíveis
- `Form` - Formulários com validação
- `Input` - Inputs customizados
- `Select` - Dropdowns acessíveis
- `Table` - Tabelas com TanStack Table
- `Calendar` - Seletor de datas
- `Chart` - Gráficos com Recharts

### Componentes Globais

- `DataTable` - Tabela com sorting, filtering e pagination
- `Pagination` - Paginação customizada
- `DatePicker` - Seletor de intervalos de datas
- `Sidebar` - Menu lateral responsivo
- `Container` - Layouts padronizados

## 📊 Features

### 🔐 Autenticação
- Login com email e código OTP
- Validação de sessão JWT
- Proteção de rotas por middleware
- Refresh automático de tokens
- Logout com limpeza de sessão

### 👥 Gestão de Clientes
- Listagem com busca e filtros
- Detalhes completos do cliente
- Histórico de transações
- Status de atividade

### 🎯 Gestão de Campanhas
- Criação e edição de campanhas
- Filtros por status e período
- Métricas de performance
- Modal de gerenciamento

### 📈 Dashboards
- KPIs principais (usuários, transações, receita)
- Gráficos de linha para análise temporal
- Gráficos de barras para comparações
- Filtros por período customizado
- Dashboards específicos:
  - Transações
  - Downloads
  - Retenção de usuários
  - Performance de campanhas

## 🔄 Integração com API

O projeto está preparado para integração com backend através de:

### Estrutura de API
```typescript
// Axios configurado com interceptors
lib/axios/authorized-axios.ts   // Requests autenticados
lib/axios/unauthorized-axios.ts // Requests públicos

// Hooks encapsulam chamadas
hooks/use-users.ts      // Gestão de usuários
hooks/use-business.ts   // Gestão de negócios
hooks/use-dashboard.ts  // Dados de dashboards

// Actions do servidor
components/login/actions.ts // Login e autenticação
hooks/actions.ts           // Ações globais
```

### Endpoints Esperados (Exemplo)
```
POST   /v1/login              - Enviar código de verificação
POST   /v1/confirmCode        - Validar código e autenticar
GET    /v1/me                 - Dados do usuário logado
GET    /v1/users              - Listar usuários
GET    /v1/business           - Listar negócios
GET    /v1/campaigns          - Listar campanhas
GET    /v1/dashboard/metrics  - Métricas do dashboard
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
# Em desenvolvimento
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## 📝 Boas Práticas Implementadas

- ✅ **TypeScript** em todo o projeto para type safety
- ✅ **ESLint** para consistência de código
- ✅ **Server Components** por padrão para melhor performance
- ✅ **Code Splitting** automático do Next.js
- ✅ **Lazy Loading** de componentes pesados
- ✅ **Error Boundaries** para tratamento de erros
- ✅ **Loading States** em todas as operações assíncronas
- ✅ **Validação** de formulários com Zod
- ✅ **Responsividade** mobile-first
- ✅ **Acessibilidade** com Radix UI

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Jonas**

- Portfolio: [seu-portfolio.com](https://seu-portfolio.com)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-perfil)
- GitHub: [@kassiogluten](https://github.com/kassiogluten)

---

⭐ Desenvolvido com Next.js 15, React 19 e TypeScript
