"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster /> {children}
    </QueryClientProvider>
  )
}
