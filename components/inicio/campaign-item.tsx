import { Text } from '@/components/global/text'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/helpers/date-helpers'
import { Megaphone } from 'lucide-react'
import Link from 'next/link'

interface CampaignItemProps {
  title: string
  createdAt: Date | string
  href: string
}

export const CampaignItem = ({ title, createdAt, href }: CampaignItemProps) => {
  const relativeTime = formatRelativeTime(createdAt)

  return (
    <div className='w-full flex flex-row items-center justify-between gap-4'>
      <div className='flex flex-row items-center gap-4'>
        <div className='size-9 flex items-center justify-center rounded-full bg-black-30'>
          <Megaphone size={20} className="text-black-900" />
        </div>
        <div className='flex flex-col gap-2'>
          <Text size="md" weight="bold">
            {title}
          </Text>
          <Text size="xs" className="text-black-100">
            {relativeTime}
          </Text>
        </div>
      </div>
      <Link href={href} className='flex flex-row items-center gap-4'>
        <Button variant="ghost" size="icon">
          Ver
        </Button>
      </Link>
    </div>
  )
}
