import { cn } from "@/lib/utils"

export function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "sm" | "default" | "lg" | "xl"
}) {
  return (
    <div
      className={cn(
        "w-full mx-auto",
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
