import { Text } from "@/components/global/text";

interface InfoItemProps {
  label: string;
  value: string;
  isLink?: boolean;
}

export const InfoItem = ({ label, value, isLink = false }: InfoItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <Text size="sm" weight="bold">{label}</Text>
      <Text 
        size="sm" 
        weight="regular" 
        className={isLink ? 'text-blue-600 underline cursor-pointer' : 'text-gray-900'}
      >
        {value}
      </Text>
    </div>
  );
} 