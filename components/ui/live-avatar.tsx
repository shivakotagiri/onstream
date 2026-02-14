import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function UserAvatar({
  src,
  name,
  isLive,
  className,
  avatarFallbackClassname,
  badgeClassname
}: {
  src: string
  name: string
  isLive?: boolean
  className?: string
  avatarFallbackClassname?: string
  badgeClassname?: string
}) {
  return (
    <div className="relative inline-block">
      <Avatar
        className={cn(
          "size-10",
          isLive && "ring-2 ring-destructive ring-offset-2 ring-offset-background",
          className
        )}
      >
        <AvatarImage src={src} alt={name} className="object-cover" />
        <AvatarFallback className={cn("bg-secondary text-secondary-foreground font-medium", avatarFallbackClassname)}>
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {isLive && (
        <span className={cn(
          "absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider text-destructive-foreground bg-destructive border-[1.5px] border-background shadow-sm uppercase", 
          badgeClassname
        )}>
          Live
        </span>
      )}
    </div>
  )
}