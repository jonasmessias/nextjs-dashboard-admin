import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  classNameContent?: string
  hasTopBar?: boolean
  fullWidth?: boolean
}

export const Container = ({ children, className, classNameContent, fullWidth = false }: ContainerProps) => {
  return (
    <div className={cn("flex h-full w-full items-center justify-center px-6 lg:px-8", className)}>
      <div className={cn(
        "flex h-full w-full flex-col gap-8",
        !fullWidth && "max-w-260",
        classNameContent
      )}>
        {children}
      </div>
    </div>
  )
}