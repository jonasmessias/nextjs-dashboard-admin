"use client"

import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T>
}

export const DatePicker = <T extends FieldValues>({ field }: Props<T>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start font-normal border border-black-100 group hover:border-pink-400 data-[state=open]:border-pink-300",
            !field.value && "text-black-100"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? (
            format(field.value, "dd/MM/yyyy")
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          locale={ptBR}
          toDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
