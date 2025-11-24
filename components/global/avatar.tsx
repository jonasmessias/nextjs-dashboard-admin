import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { CircleUserRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const avatarVariants = cva('border-none', {
  variants: {
    size: {
      '24px': 'size-6 max-sm:size-10',
      '32px': 'size-8',
      '40px': 'size-10',
      '48px': 'size-12',
      '64px': 'size-16',
      '72px': 'size-18',
      '106px': 'size-26.5',
      '250px': 'size-62.5',
    },
  },
  defaultVariants: {
    size: '24px',
  },
})

const fallbackIconVariants = cva('text-yellow-300', {
  variants: {
    size: {
      '24px': '!size-[calc(24px-8px)] max-sm:size-[calc(40px-8px)]',
      '32px': '!size-[calc(32px-8px)]',
      '40px': '!size-[calc(40px-8px)]',
      '48px': '!size-[calc(48px-8px)]',
      '64px': '!size-[calc(64px-8px)]',
      '72px': '!size-[calc(72px-8px)]',
      '106px': '!size-[calc(106px-8px)]',
      '250px': '!size-[calc(250px-8px)]',
    },
  },
  defaultVariants: {
    size: '24px',
  },
})

interface AvatarProfileProps extends VariantProps<typeof avatarVariants> {
  avatarUrl?: string
  className?: string
}

export const AvatarProfile = ({
  avatarUrl,
  size,
  className,
}: AvatarProfileProps) => {
  return (
    <Avatar className={cn(avatarVariants({ size, className }))}>
      <AvatarImage src={avatarUrl || ''} alt="avatar-foto-perfil" />
      <AvatarFallback className={cn('bg-black-0')}>
        <CircleUserRound
          className={cn(fallbackIconVariants({ size }))}
        />
      </AvatarFallback>
    </Avatar>
  )
}
