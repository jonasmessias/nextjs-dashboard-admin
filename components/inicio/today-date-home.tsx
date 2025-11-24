import { Text } from "@/components/global/text"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const TodayDateOnHome = () => {
  const today = new Date()
  
  const dayOfWeek = capitalize(format(today, "EEEE", { locale: ptBR }))
  const day = format(today, "dd")
  const month = capitalize(format(today, "MMMM", { locale: ptBR }))
  const year = format(today, "yyyy")

  return (
    <div className="flex flex-col items-end justify-end gap-2">
      <Text size="md" weight="regular">{dayOfWeek}, {day}</Text>
      <Text size="xs" weight="regular" className="text-black-100">{month}/{year}</Text>
    </div>
  )
}