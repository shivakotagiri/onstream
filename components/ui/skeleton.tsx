import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("dark:bg-[#2c2d31] bg-[#bcbdc1] animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
