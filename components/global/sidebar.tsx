"use client"

import { AvatarProfile } from "@/components/global/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useMe } from "@/hooks/use-me"
import { ROUTES } from "@/lib/config/routes"
import { cn } from "@/lib/utils"
import { ChevronDown, type LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FC } from "react"
import { toast } from "sonner"
import { Popover, PopoverOption } from "./popover"
import { Text } from "./text"

export const SideBar = () => {
  const navigatorRoute = usePathname().slice(1).split("/")[0]
  const { open } = useSidebar()

  const { data: user } = useMe()

  console.log(user)

  return (
    <Sidebar className="bg-black-0">
      <div className="flex justify-center py-8 px-4">
        <Image
          alt="logo"
          src={"/logos/logo.svg"}
          width={300}
          height={300}
          priority
          quality={100}
          className="max-w-[121px]"
        />
      </div>
      <Separator className="bg-black-40" />

      <SidebarHeader className="py-8 px-4">
        <UserPopover />
      </SidebarHeader>
      <Separator className="bg-black-40" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={cn("space-y-2", open && "p-2")}>
              {ROUTES.map((route, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={route.path === navigatorRoute}
                  >
                    <Link href={`/${route.path}`}>
                      <RenderRouteItem
                        isActive={route.path === navigatorRoute}
                        icon={route.icon}
                        name={route.name}
                      />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

interface RenderRouteItemProps {
  icon?: LucideIcon
  name: string
  isActive?: boolean
}

const RenderRouteItem: FC<RenderRouteItemProps> = ({ icon: Icon, name }) => (
  <div className="flex items-center gap-2">
    {Icon && <Icon size={16} className="text-black-900" />}
    <span className="leading-none">{name}</span>
  </div>
)

const UserPopoverSkeleton = () => {
  return (
    <div className="w-full">
      <button className="cursor-pointer hover:bg-black-30 data-[state='open']:bg-black-30 group flex w-full items-center gap-2 rounded-lg px-2 py-1">
        <div className="flex w-full items-center justify-between min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col items-start justify-center gap-2 min-w-0 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="flex flex-shrink-0">
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </button>
    </div>
  )
}

export const UserPopover = () => {
  const { data: user, isLoading } = useMe()
  const { push } = useRouter()

  const handleLogout = () => {
    toast.success("Deslogado com sucesso!")
    push("/login/admin")
  }

  if (isLoading) {
    return <UserPopoverSkeleton />
  }
  
  return (
    <div className="w-full">
      <Popover
        className="w-[170px] border-none p-2 "
        align="end"
        side="bottom"
        alignOffset={0}
        trigger={
          <button className="cursor-pointer hover:bg-black-30 data-[state='open']:bg-black-30 group flex w-full items-center gap-2 rounded-lg px-2 py-1">
            <div className="flex w-full items-center justify-between min-w-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <AvatarProfile
                  avatarUrl={user?.imageUrl as string}
                  size="40px"
                />
                <div className="flex flex-col items-start justify-center gap-2 min-w-0 flex-1">
                  <Text
                    size="md"
                    weight="extraBold"
                    className="line-clamp-1 overflow-hidden text-start leading-none overflow-ellipsis w-full"
                  >
                    {user?.name}
                  </Text>
                  <Text
                    size="xs"
                    weight="regular"
                    className="text-black-100 line-clamp-1 overflow-hidden text-start leading-none overflow-ellipsis w-full"
                  >
                    {user?.email}
                  </Text>
                </div>
              </div>
              <div className="flex flex-shrink-0">
                <ChevronDown className="text-black-500 transition-all group-data-[state='open']:rotate-180" />
              </div>
            </div>
          </button>
        }
      >
        <div className="flex flex-col gap-2">
          <PopoverOption onClick={handleLogout}>
            <Text
              size="md"
              weight="bold"
              className="text-black-500 line-clamp-1 overflow-hidden text-start leading-none"
            >
              Sair
            </Text>
          </PopoverOption>
        </div>
      </Popover>
    </div>
  )
}
