import { cn } from "@/lib/utils"

export function Container({
  className,
  size = "full",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "sm" | "default" | "lg" | "xl" | "full"
}) {
  return (
    <div
      className={cn(
        "w-full mx-auto animate-in fade-in slide-in-from-bottom-5 duration-100 ease-out",
        size === "sm"      && "max-w-2xl",
        size === "default" && "max-w-4xl",
        size === "lg"      && "max-w-6xl",
        size === "xl"      && "max-w-7xl",
        className,
      )}
      {...props}
    />
  )
}
