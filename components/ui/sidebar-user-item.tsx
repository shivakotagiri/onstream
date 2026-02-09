"use client";

import { useRouter } from "next/navigation"
import { LiveAvatar } from "./live-avatar"

export function SidebarUserItem({
  name,
  avatar,
  isLive,
}: {
  name: string
  avatar: string
  isLive: boolean
}) {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/" + name.replace(/ /g, "").toLowerCase())} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-sidebar-accent cursor-pointer">
      <LiveAvatar src={avatar} name={name} isLive={isLive} />
      <span className="text-sm font-medium truncate">{name}</span>
    </div>
  )
}
