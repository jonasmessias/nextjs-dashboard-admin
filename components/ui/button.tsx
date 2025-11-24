import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-5xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-yellow-300 text-black-900 hover:bg-yellow-100 disabled:bg-black-700 disabled:text-black-50",
        destructive:
          "bg-red-300 text-black-0 hover:bg-red-500 disabled:bg-black-700 disabled:text-black-100",
        destructiveGhost:
          "text-red-300 hover:text-red-500 disabled:text-black-100",
        destructiveOutline:
          "border border-red-300 text-red-300 hover:border-red-500 hover:text-red-500 disabled:border-black-100 disabled:text-black-100",
        outline:
          "bg-transparent border border-black-900 text-black-900 hover:border-black-50 hover:text-black-50 disabled:border-black-100 disabled:text-black-100",
        secondary:
          "bg-black-700 text-black-0 hover:bg-black-500 disabled:bg-black-700 disabled:text-black-50",
        ghost:
          "bg-transparent text-black-900 hover:text-black-100 disabled:text-black-50",
        link:
          "bg-transparent text-black-900 hover:underline p-0 h-auto shadow-none hover:text-black-500 hover:bg-transparent active:text-black-500",
      },
      size: {
        default: "h-10 px-4 py-2.5",
        sm: "h-8 px-3 py-2",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingTitle?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingTitle = "Carregando...",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    if (isLoading) {
      return (
        <Comp
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <Loader2 className="animate-spin" />
          {loadingTitle}
        </Comp>
      )
    }

    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
