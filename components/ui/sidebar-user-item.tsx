"use client";

import { useRouter } from "next/navigation"
import { UserAvatar } from "./live-avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useSidebar } from "./sidebar";

export function SidebarUserItem({
  name,
  avatar,
  isLive,
  username
}: {
  name: string
  avatar: string
  isLive: boolean,
  username: string
}) {
  const router = useRouter();
  const { state, isMobile } = useSidebar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={() =>
            router.push("/" + username.replace(/ /g, "").toLowerCase())
          }
          className="flex items-center gap-5 rounded-md px-2 py-2 hover:bg-sidebar-accent cursor-pointer"
        >
          <UserAvatar src={avatar} name={name} isLive={isLive} className="size-5" badgeClassname="text-[5px] font-semibold" />
          <span className="text-sm font-medium truncate">{username}</span>
        </div>
      </TooltipTrigger>

      <TooltipContent hidden={state !== "collapsed" || isMobile} side="right" align="center" sideOffset={8}>
        {username}
      </TooltipContent>
    </Tooltip>
  )
}