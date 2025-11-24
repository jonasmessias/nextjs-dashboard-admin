import { GoldIcon, SilverIcon } from "@/components/global/svg-icons";
import { DiamondIcon } from "@/components/global/svg-icons";
import { Text } from "@/components/global/text";

interface BonusLevelItemProps {
  level: 'diamond' | 'gold' | 'silver'
  title: string
  minPoints: number
  decrementPoints: number
  description: string
}

export const BonusLevelItem = ({ 
  level, 
  title, 
  minPoints, 
  decrementPoints, 
  description 
}: BonusLevelItemProps) => {

  const getIcon = () => {
    switch (level) {
      case 'diamond':
        return <DiamondIcon width={20} height={20} color="#006eff" />
      case 'gold':
        return <GoldIcon width={20} height={20} color="#ffb901" />
      case 'silver':
        return <SilverIcon width={20} height={20} color="#bfbfbf" />
      default:
        return null
    }
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <div className={`w-full flex justify-between gap-2`}>
        <div className="flex items-center gap-2">
          {getIcon()}
          <Text size={"md"} weight={"extraBold"}>{title}</Text>
        </div>
        <div className="flex flex-col items-center justify-end">
          <Text size={"md"} weight={"extraBold"}>{minPoints}+</Text>
          <Text size={"xs"} className="text-black-100">Pontos</Text>
        </div>
      </div>
      <Text size={"sm"} tag="p">
        {description}
      </Text>
      <div className="w-full flex justify-between gap-2">
        <Text size={"sm"} weight={"extraBold"}>Redução mensal</Text>
        <Text size={"sm"}>{decrementPoints}</Text>
      </div>
    </div>
  )
} 