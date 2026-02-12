import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function LiveAvatar({
  src,
  name,
  isLive,
  className
}: {
  src: string
  name: string
  isLive: boolean,
  className?: string
}) {
  return (
    <div className="relative">
      <Avatar
        className={cn(
          "size-10",
          isLive && "ring-2 ring-red-500 ring-offset-2 ring-offset-background",
          className
        )}
      >
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>

      {isLive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded px-1.5 py-px text-[5px] font-semibold text-white bg-red-500">
          LIVE
        </span>
      )}
    </div>
  )
}
