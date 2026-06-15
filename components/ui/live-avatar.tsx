import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export function UserAvatar({
  src,
  name,
  isLive,
  className,
  avatarFallbackClassname,
  badgeClassname,
  AvatarFallbackIcon,
  badge = true
}: {
  src: string
  name: string
  isLive?: boolean
  className?: string
  avatarFallbackClassname?: string
  badgeClassname?: string,
  AvatarFallbackIcon?: LucideIcon
  badge?: boolean
}) {
  return (
    <div className="inline-block">
      <Avatar
        className={cn(
          "size-10 relative rounded-full",
          isLive && "ring-2 ring-red-600 ring-offset-2 ring-offset-background overflow-visible border-0",
          className
        )}
      >
        {!!src && <AvatarImage src={src} alt={name} className="object-cover rounded-full" /> }
        <AvatarFallback className={cn("bg-secondary text-secondary-foreground font-medium", className, avatarFallbackClassname)}>
          {AvatarFallbackIcon ? 
            <AvatarFallbackIcon className="size-4" />:
            name?.charAt(0).toUpperCase()
          }
        </AvatarFallback>
        {isLive && badge && (
          <span className={cn(
            "absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider text-destructive-foreground bg-red-600 shadow-sm uppercase z-10", 
            badgeClassname
          )}>
            Live
          </span>
        )}
      </Avatar>
    </div>
  )
}