import { AvatarProfile } from "@/components/global/avatar"
import { Text } from "@/components/global/text"

interface AvatarHomeProps {
  name: string
  email: string
  avatarUrl: string
}

export const AvatarHome = ({ name, email, avatarUrl }: AvatarHomeProps) => {
  return (
    <div className="flex items-center gap-4">
      <AvatarProfile avatarUrl={avatarUrl} size="72px" />
      <div className="flex flex-col gap-2">
        <Text size="huge-3" weight="bold" className="max-lg:text-2xl text-black-500">
          Bem vindo, {name}
        </Text>
        <Text size="md" className="text-black-500">
          {email}
        </Text>
      </div>
    </div>
  )
}
