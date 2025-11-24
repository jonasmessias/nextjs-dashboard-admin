'use client'

import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'
import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  'aria-label'?: string
  error?: boolean
}

const IconWrapper = ({
  Icon,
  side,
  disabled,
  isFocused,
}: {
  Icon: LucideIcon
  side: 'left' | 'right'
  disabled?: boolean
  isFocused?: boolean
}) => (
  <div
    className={`absolute ${side === 'left' ? 'left-4' : 'right-4'} top-1/2 z-10 -translate-y-1/2`}>
    <Icon
      size={16}
      className={cn(
        disabled ? 'text-black-50' : isFocused ? 'text-black-500' : 'text-black-80'
      )}
    />
  </div>
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      icon: IconElement,
      iconSide = 'left',
      placeholder = '',
      'aria-label': ariaLabel,
      className,
      error,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true)
      props.onFocus?.(e as React.FocusEvent<HTMLInputElement>)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false)
      props.onBlur?.(e as React.FocusEvent<HTMLInputElement>)
    }

    return (
      <div className={cn('relative min-w-[152px] rounded-5xl', className)}>
        {IconElement && iconSide === 'left' && (
          <IconWrapper
            Icon={IconElement}
            side="left"
            disabled={disabled}
            isFocused={isFocused}
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            'min-w-[152px] h-[40px] w-full border px-4 text-sm rounded-5xl',
            'bg-black-30',
            'disabled:bg-black-500',
            'placeholder:text-black-100',
            IconElement && iconSide === 'left' && 'pl-10',
            IconElement && iconSide === 'right' && 'pr-10',
            error ? 'border-red-300' : isFocused ? 'border-yellow-300' : 'border-black-40',
            disabled && 'bg-black-500 placeholder:text-black-200',
            'focus:outline-none',
            value && value !== '' ? 'text-black-500' : disabled ? 'text-black-50' : isFocused ? 'text-black-500' : 'text-black-80'
          )}
          ref={ref}
          aria-label={ariaLabel}
          {...props}
        />
        {IconElement && iconSide === 'right' && (
          <IconWrapper
            Icon={IconElement}
            side="right"
            disabled={disabled}
            isFocused={isFocused}
          />
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
