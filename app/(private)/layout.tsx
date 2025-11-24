import { SideBar } from "@/components/global/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <main className={"h-full w-full flex "}>
        <SideBar />
        <div className={`size-full antialiased flex justify-center`}>
          <div className="w-full md:w-[calc(100vw-287px)]">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  )
}
