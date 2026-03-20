import { Skeleton } from "@/components/ui/skeleton"

// Renders 4 placeholder rows that mirror the shape of a NotificationItem.
export function NotificationLoadingSkeleton() {
  return (
    <div className="space-y-0.5 p-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3 rounded-xl p-3">
          <Skeleton className="mt-0.5 size-7 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-2 pt-0.5">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-3.5 w-1/2" />
              <Skeleton className="h-3 w-10 shrink-0" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
