import { Skeleton } from "@/components/ui/skeleton"

export const CustomersTablesSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full items-center justify-between gap-2">
        <Skeleton className="h-10 w-[360px] rounded-5xl" />
        <Skeleton className="h-10 w-24 rounded-5xl" />
      </div>
      
      <div className="h-full w-full rounded-2xl border flex flex-col overflow-hidden">
        <div className="w-full min-w-[1200px] flex-1">
          <div className="bg-black-30 sticky top-0 z-10">
            <div className="h-12 flex border-none w-full">
              <div className="h-12 flex-[500] p-0 pl-4 rounded-tl-2xl flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-12 flex-[200] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="h-12 flex-[145] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="h-12 flex-[150] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-12 flex-[180] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="h-12 flex-[150] p-0 pl-4 pr-4 rounded-tr-2xl flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          
          <div className="max-h-[calc(100vh-22rem)] overflow-y-auto">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="h-12 flex hover:bg-black-20 w-full">
                <div className="h-12 flex-[500] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="h-12 flex-[200] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="h-12 flex-[145] p-0 pl-4 flex items-center justify-center">
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="h-12 flex-[150] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="h-12 flex-[180] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="h-12 flex-[150] p-0 pl-4 pr-4 flex items-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-black-30 h-10 rounded-b-2xl" />
      </div>
      
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Skeleton className="h-4 w-24" />
        </div>
        
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
