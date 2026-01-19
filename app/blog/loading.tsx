import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
       <div className="border-b bg-background sticky top-0 z-50 p-4">
         <div className="container mx-auto flex justify-between items-center">
           <Skeleton className="h-8 w-32" />
           <div className="flex gap-4">
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
           </div>
         </div>
       </div>

       <main className="flex-1 bg-gray-50/50">
        <div className="container mx-auto px-4 py-14">
          <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border p-4 space-y-4">
                <Skeleton className="w-full h-48 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}