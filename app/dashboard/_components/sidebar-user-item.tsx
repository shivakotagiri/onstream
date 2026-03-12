"use client";

import { useRouter } from "next/navigation"
import { UserAvatar } from "@/components/ui/live-avatar"; 
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/components/ui/sidebar"; 
import { LucideIcon } from "lucide-react";

export function SidebarUserItem({
  label,
  route,
  icon: Icon,
}: {
  label: string
  route: string
  icon: LucideIcon
}) {
  const router = useRouter();
  const { state, isMobile } = useSidebar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={() =>
            router.push(route)
          }
          className="flex items-center gap-3 px-2 py-2 hover:bg-sidebar-accent cursor-pointer"
        >
          <Icon />
          {state === "expanded" && <span className="text-sm font-medium truncate">{label}</span>}
        </div>
      </TooltipTrigger>

      <TooltipContent hidden={state !== "collapsed" || isMobile} side="right" align="center" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}