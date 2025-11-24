'use client'

import { Text } from '@/components/global/text'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface QuickActionProps {
  title: string
  iconName: keyof typeof LucideIcons
  href: string
}

export const QuickAction = ({ title, iconName, href }: QuickActionProps) => {
  const Icon = LucideIcons[iconName] as ComponentType<{ size?: number; className?: string }>

  return (
    <Link href={href} className="w-full lg:max-w-[450px] flex flex-col items-center justify-center gap-4 p-8 rounded-lg border border-black-40 transition-colors hover:bg-yellow-50 hover:border-yellow-300 group">
      <Icon size={24} className="text-black-900 group-hover:text-yellow-300 transition-colors" />
      <Text size="md" weight="bold" className="group-hover:text-yellow-300 transition-colors">
        {title} 
      </Text>
    </Link>
  )
}