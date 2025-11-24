import { cn } from "@/lib/utils"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { FC, forwardRef, ReactNode } from "react"
import { Button, ButtonProps } from "../ui/button"
import {
  PopoverContent,
  PopoverTrigger,
  Popover as ShadPopover,
} from "../ui/popover"

interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  trigger: ReactNode
  children: ReactNode
}

export const Popover: FC<PopoverProps> = ({
  trigger,
  children,
  className,
  ...props
}) => {
  return (
    <ShadPopover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[var(--radix-popover-trigger-width)] p-2 rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </PopoverContent>
    </ShadPopover>
  )
}

interface PopoverOptionProps extends ButtonProps {
  children: ReactNode
  active?: boolean
}

export const PopoverOption = forwardRef<HTMLButtonElement, PopoverOptionProps>(
  ({ children, size, active, className, ...props }, ref) => {
    return (
      <Button
        variant={"ghost"}
        size={size}
        data-active={active}
        className={cn(
          "font-normal rounded-lg px-2 py-1.5 hover:bg-black-30 hover:text-black-900 justify-between data-[active=true]:bg-green-75",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

PopoverOption.displayName = "PopoverOption"
