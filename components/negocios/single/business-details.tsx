'use client'

import { Heading } from "@/components/global/heading";
import { Button } from "@/components/ui/button";
import type { Business } from "@/types/user";
import { Settings2 } from "lucide-react";
import { BusinessBonusSection } from "./business-bonus-section";
import { BusinessClientsTable } from "./business-clients-table";
import { BusinessHeader } from "./business-header";
import { BusinessInfoSection } from "./business-info-section";
import { GallerySlider } from "./gallery-slider";

export const BusinessDetails = ({ business }: { business: Business }) => {
  return (
    <div className="flex flex-col gap-10">
      <Heading 
        action={
          <Button variant="outline" onClick={() => {}}>
            <Settings2 className="h-4 w-4 mr-2" />
            Gerenciar
          </Button>
        }
        hasReturnButton
      >
        {business.name}
      </Heading>
      <GallerySlider images={business.galleryImagesUrls || []} />
      <BusinessHeader business={{
        name: business.name,
        imageUrl: business.imageUrl || '',
        address: business.address,
        city: business.city,
        state: business.state,
        description: business.description,
        category: business.category,
      }} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <BusinessInfoSection businessUser={{
          name: business.name || '',
          email: business.owner?.email || '',
          phone: business.phone || '',
          document: business.cnpj || '',
          createdAt: typeof business.createdAt === 'string' 
            ? business.createdAt 
            : business.createdAt.toISOString(),
        }} business={{
          cnpj: business.cnpj,
          address: business.address,
          city: business.city,
          state: business.state,
        }} />
        <BusinessBonusSection business={business} />
      </div>
      <BusinessClientsTable />
    </div>
  )
} 