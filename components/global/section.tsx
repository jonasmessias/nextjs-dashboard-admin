import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  hasTopBar?: boolean
}


export const Section = ({ children, className, hasTopBar }: ContainerProps) => {
  return (
    <div
      className={cn(
        'bg-black-0 mx-auto min-h-screen w-full justify-start py-8',
        hasTopBar && 'h-[calc(100vh-105px)]',
        className
      )}>
      {children}
    </div>
  )
}
