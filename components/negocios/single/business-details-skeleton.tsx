import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BusinessDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header with title and action button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-6" /> {/* Return button */}
          <Skeleton className="h-8 w-64" /> {/* Title */}
        </div>
        <Skeleton className="h-10 w-32" /> {/* Action button */}
      </div>

      {/* Gallery Slider */}
      <div className="relative w-full h-76 overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Business Header */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-start gap-4">
          <Skeleton className="h-[106px] w-[106px] rounded-full" /> {/* Avatar */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48" /> {/* Business name */}
            <div className="flex items-center justify-start gap-2">
              <Skeleton className="h-5 w-5" /> {/* MapPin icon */}
              <Skeleton className="h-5 w-32" /> {/* Address */}
            </div>
            <Skeleton className="h-6 w-24" /> {/* Category badge */}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" /> {/* Description label */}
          <Skeleton className="h-5 w-full" /> {/* Description text */}
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>

      {/* Info and Bonus sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Business Info Section */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-32" /> {/* "Informações" title */}
          <Card className="p-8">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" /> {/* Label */}
                <Skeleton className="h-5 w-32" /> {/* Value */}
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-28" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-36" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </Card>
        </div>

        {/* Business Bonus Section */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-32" /> {/* "Bonificação" title */}
          <Card className="p-8 min-h-[566px]">
            <div className="h-full grid grid-cols-1 grid-rows-5 justify-center items-center gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-24" /> {/* Diamond title */}
                <Skeleton className="h-4 w-16" /> {/* Min points */}
                <Skeleton className="h-4 w-20" /> {/* Decrement points */}
                <Skeleton className="h-4 w-32" /> {/* Description */}
              </div>
              <Skeleton className="h-px w-full" /> {/* Separator */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-16" /> {/* Gold title */}
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-px w-full" /> {/* Separator */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-20" /> {/* Silver title */}
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Clients Table */}
      <div className="flex flex-col gap-10 mt-10">
        <Skeleton className="h-8 w-48" /> {/* "Clientes e Pagamentos" title */}
        <div className="flex w-full items-center justify-between gap-2">
          <Skeleton className="h-10 w-[360px]" /> {/* Search filter */}
          <Skeleton className="h-10 w-24" /> {/* Filter button */}
        </div>
        <div className="w-full">
          <div className="border rounded-lg">
            <div className="border-b">
              <div className="grid grid-cols-5 gap-4 p-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b last:border-b-0">
                <div className="grid grid-cols-5 gap-4 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Skeleton className="h-8 w-64" /> {/* Pagination */}
        </div>
      </div>
    </div>
  )
} 