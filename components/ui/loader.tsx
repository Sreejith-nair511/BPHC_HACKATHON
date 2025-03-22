import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Loader({ size = "md", className }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn("border-t-transparent rounded-full border-primary animate-spin", {
          "w-6 h-6 border-2": size === "sm",
          "w-10 h-10 border-4": size === "md",
          "w-16 h-16 border-4": size === "lg",
        })}
      />
    </div>
  )
}

