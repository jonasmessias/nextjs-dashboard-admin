'use client'

import { AvatarHome } from "@/components/inicio/avatar-home"
import { Skeleton } from "@/components/ui/skeleton"
import { useMe } from "@/hooks/use-me"

const AvatarHomeSkeleton = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="size-[72px] rounded-full" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
)

export function AvatarHomeClient() {
  const { data: user, isLoading } = useMe()

  if (isLoading) {
    return <AvatarHomeSkeleton />
  }

  if (!user) {
    return <AvatarHomeSkeleton />
  }

  return (
    <AvatarHome
      name={user.name || "Usuário"}
      email={user.email || "usuario@exemplo.com"}
      avatarUrl={user.imageUrl || ""}
    />
  )
} 