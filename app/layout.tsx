import { Providers } from "@/app/providers"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description: "Painel administrativo full-stack com autenticação JWT, gerenciamento de usuários e dashboards analíticos",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
