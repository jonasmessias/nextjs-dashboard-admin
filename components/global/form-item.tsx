import { DatePicker } from "@/components/global/date-picker"
import { SelectField, type SelectOption } from "@/components/global/select"
import {
  FormControl,
  FormLabel,
  FormMessage,
  FormItem as OriginalFormItem,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import React, { HTMLInputTypeAttribute } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { withMask } from "use-mask-input"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { OTP } from "./otp"

export type FormFieldType =
  | "input"
  | "select"
  | "date-picker"
  | "textarea"
  | "checkbox"
  | "otp"

interface MaskConfig {
  pattern: string | string[]
  showPlaceholder?: boolean
  placeholderChar?: string
}

interface FormItemProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ControllerRenderProps<T>
  fieldType: FormFieldType
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  hideSupportiveText?: boolean
  selectHasSearch?: boolean
  className?: string
  mask?: string | string[] | MaskConfig
  update?: (value: string) => void
  options?: SelectOption[]
  isLoading?: boolean
  multiplier?: boolean
  maxLength?: number
}

const RenderInput = <T extends FieldValues>({
  fieldType,
  field,
  options,
  mask,
  isLoading,
  maxLength,
  ...inputProps
}: FormItemProps<T>) => {
  const opts = options
  
  const processMask = (maskValue: string | string[] | MaskConfig) => {
    if (typeof maskValue === 'string' || Array.isArray(maskValue)) {
      return withMask(maskValue)
    }
    
    const { pattern, showPlaceholder = true, placeholderChar = '_' } = maskValue
    return withMask(pattern, {
      placeholder: showPlaceholder ? placeholderChar : undefined
    })
  }
  
  switch (fieldType) {
    case "input":
      return (
        <FormControl>
          <Input
            {...inputProps}
            {...field}
            maxLength={maxLength}
            ref={mask ? processMask(mask) : undefined}
          />
        </FormControl>
      )
    case "otp":
      return (
        <FormControl className="flex justify-center w-fit">
          <OTP field={field} maxLength={maxLength} {...inputProps} />
        </FormControl>
      )
    case "select":
      return (
        <SelectField
          field={field}
          options={opts}
          hasSearch={inputProps.selectHasSearch}
          isLoading={isLoading}
          {...inputProps}
        />
      )
    case "date-picker":
      return <DatePicker field={field} />
    case "textarea":
      return (
        <FormControl>
          <Textarea
            {...field}
            className={cn(
              'notebook-lines max-h-[400px] min-h-[100px] resize-none p-4 text-sm font-medium text-black-900',
              inputProps.className
            )}
            rows={6}
          />
        </FormControl>
      )
    case "checkbox":
      return (
        <div className="flex flex-col gap-2">
          {opts?.map((opt: { label: string; value: string }) => (
            <Label key={opt.value} className="flex items-center gap-2 cursor-pointer hover:bg-black-30 rounded-md p-2">
              <Checkbox
                checked={field.value?.includes(opt.value)}
                onCheckedChange={(checked) => {
                  const prev = field.value || []
                  if (checked) {
                    field.onChange([...prev, opt.value])
                  } else {
                    field.onChange(prev.filter((v: string) => v !== opt.value))
                  }
                }}
              />
              {opt.label}
            </Label>
          ))}
        </div>
      )
    default:
      return null
  }
}

export const FormItem = <T extends FieldValues>(props: FormItemProps<T>) => {
  const { label, hideSupportiveText = false, className } = props
  return (
    <OriginalFormItem className={cn(className)}>
      <FormLabel className="max-h-3 font-semibold">{label}</FormLabel>
      <RenderInput {...props} />
      {!hideSupportiveText && (
        <div className="h-3 mt-0">
          <FormMessage />
        </div>
      )}
    </OriginalFormItem>
  )
}
