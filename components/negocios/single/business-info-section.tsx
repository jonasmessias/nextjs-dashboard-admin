import { InfoItem } from "@/components/global/info-item";
import { Text } from "@/components/global/text";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BusinessInfoSectionProps {
  businessUser: {
    name: string;
    email: string;
    phone: string;
    document: string;
    createdAt: string;
  };
  business: {
    cnpj: string;
    address: string;
    city: string;
    state: string;
  };
}

export function BusinessInfoSection({ businessUser, business }: BusinessInfoSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Text size="huge" weight="extraBold">Informações</Text>
      <Card className="p-8">
        <ScrollArea className="h-full max-h-[534px]">
          <div className="flex flex-col gap-10">
            <InfoItem label="Responsável" value={businessUser.name} />
            <InfoItem label="E-mail" value={businessUser.email} />
            <InfoItem label="Telefone" value={businessUser.phone} />
            <InfoItem label="Documento de Identificação" value={businessUser.document} isLink />
            <InfoItem label="CNPJ" value={business.cnpj} />
            <InfoItem label="Endereço" value={business.address} />
            <InfoItem label="Cidade" value={business.city} />
            <InfoItem label="Estado" value={business.state} />
            <InfoItem label="Cadastro" value={new Date(businessUser.createdAt).toLocaleDateString('pt-BR')} />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
} 