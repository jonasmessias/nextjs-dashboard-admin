import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { FormControl } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { ChevronDown, Loader2 } from "lucide-react"
import { useState } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"

export type SelectOption = {
  value: string
  label: string
}

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T>
  options?: SelectOption[]
  placeholder?: string
  className?: string
  disabled?: boolean
  update?: (value: string) => void
  hasSearch?: boolean
  isLoading?: boolean
}

export const SelectField = <T extends FieldValues>({
  field,
  options,
  className,
  disabled,
  update,
  hasSearch = true,
  isLoading,
}: Props<T>) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={cn("flex flex-col", className)}>
      <Popover modal={true} onOpenChange={(open) => setIsFocused(open)}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="ghost"
              role="combobox"
              className={cn(
                "w-full justify-between font-normal h-[40px] rounded-5xl bg-black-30 border px-4 text-sm",
                "disabled:bg-black-500",
                "placeholder:text-black-100",
                "focus:outline-none",
                disabled ? 'text-black-50' : isFocused ? 'text-black-500' : 'text-black-80',
                isFocused ? 'border-yellow-300' : 'border-black-40',
                disabled && 'bg-black-500 placeholder:text-black-200',
                !field.value && "text-black-100"
              )}
              disabled={disabled}
            >
              {field.value
                ? options?.find((option) => option.value === field.value)?.label
                : "Selecione"}
              <ChevronDown 
                size={16} 
                className={cn(
                  "shrink-0 transition-all",
                  isFocused ? "rotate-180 text-black-500" : "text-black-80"
                )} 
              />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-lg">
          {isLoading ? (
            <div className="h-20 flex items-center justify-center">
              <Loader2 className="animate-spin text-pink-300" />
            </div>
          ) : (
            <Command>
              {hasSearch && <CommandInput placeholder="Pesquisar" />}
              <CommandList>
                <CommandEmpty>Nenhum encontrado.</CommandEmpty>
                <CommandGroup>
                  {options?.map((option) => (
                    <CommandItem
                      className="rounded-lg mt-2 first:mt-0 cursor-pointer"
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        if (update) {
                          update(option.value)
                        } else {
                          if (field.value === option.value) {
                            field.onChange("")
                          } else {
                            field.onChange(option.value)
                          }
                        }
                      }}
                    >
                      <Checkbox
                        checked={option.value === field.value}
                        className="mr-2"
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
