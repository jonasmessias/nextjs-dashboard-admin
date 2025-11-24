'use client'

import { Text } from '@/components/global/text'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CircleArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeadingProps {
  children: React.ReactNode
  hasReturnButton?: boolean
  returnHref?: string
  action?: React.ReactNode
  size?: "huge-3" | "huge-2"
}

export const Heading = ({ children, hasReturnButton = false, action, size = "huge-3" }: HeadingProps) => {

  const { back } = useRouter()
  return (
    <div className="mx-auto flex flex-col lg:flex-row w-full items-start lg:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Text size={size} weight="bold" className="max-sm:text-2xl max-md:text-3xl text-black-700">
          {children}
        </Text>
      </div>
      <div className={cn("flex flex-1 justify-end items-center gap-4", action && "justify-between")}>
        {action}
        {hasReturnButton && (
          <Button variant="ghost" onClick={() => back()}>
            <CircleArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        )}
      </div>
    </div>
  )
}
