'use client'

import { Text } from '@/components/global/text'
import { Card } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface KPIDashboardProps {
  iconName: keyof typeof LucideIcons
  label: string
  value: number | string
  percentageChange?: number
  comparisonText?: string
  showAsPercentage?: boolean
  href: string
}

export const KPIDashboard = ({
  iconName,
  label,
  value,
  percentageChange,
  comparisonText,
  showAsPercentage = false,
  href,
}: KPIDashboardProps) => {
  const Icon = LucideIcons[iconName] as ComponentType<{ size?: number; className?: string }>
  const isPositive = percentageChange !== undefined && percentageChange >= 0
  const percentageColor = isPositive ? 'text-green-500' : 'text-red-500'
  const ArrowIcon = isPositive ? LucideIcons.ArrowUp : LucideIcons.ArrowDown

  const formatValue = () => {
    if (showAsPercentage) {
      if (typeof value === 'number') {
        return `${value.toFixed(1)}%`
      }
      return `${value}%`
    }
    return value
  }

  return (
    <Link href={href} className="block">
      <Card className="w-full flex flex-row max-2xl:flex-wrap items-start justify-start h-fit min-h-[132px] overflow-hidden gap-4 p-6 border-0 hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="flex items-center justify-center min-h-21 min-w-21 bg-yellow-50 rounded-2xl flex-shrink-0">
          <Icon size={24} className="text-yellow-300" />
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <Text size="huge" weight="bold" className="text-black-700">
            {formatValue()}
          </Text>
          <Text size="sm" className="text-black-100">
            {label}
          </Text>
          {percentageChange !== undefined && comparisonText && (
            <div className="flex items-center gap-1">
              <ArrowIcon size={16} className={percentageColor} />
              <Text size="sm" className={`text-xs font-medium ${percentageColor}`}>{Math.abs(percentageChange)}%</Text>
              <Text size="xs" className="text-black-100 whitespace-nowrap">{comparisonText}</Text>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
