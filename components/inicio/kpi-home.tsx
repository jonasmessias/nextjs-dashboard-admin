'use client'

import { Text } from '@/components/global/text'
import { Card } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import { ComponentType } from 'react'

export interface KPIHomeProps {
  iconName: keyof typeof LucideIcons
  label: string
  value: number
}

export const KPIHome = ({
  iconName,
  label,
  value,
}: KPIHomeProps) => {
  const Icon = LucideIcons[iconName] as ComponentType<{ size?: number; className?: string }>

  return (
    <Card className="w-full flex flex-row items-center justify-start h-fit min-h-[144px] md:max-w-[500px] overflow-hidden p-8 gap-4">
      <div className="flex items-center justify-center size-20 bg-yellow-50 rounded-2xl">
        <Icon size={48} className='text-yellow-300' />
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <Text size="huge" weight="bold" className="text-black-700">
          {value}
        </Text>
        <Text size="sm" className="text-black-100">
          {label}
        </Text>
      </div>
    </Card>
  )
}
