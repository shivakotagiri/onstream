"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarUserItem } from "./sidebar-user-item"; 
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { currentUserType } from "@/actions/user";

export function DashboardSidebar({ currentUser }: { currentUser: currentUserType | null}) {
    const data = [{
        label: "Stream",
        route: `/dashboard/${currentUser?.username}`,
        icon: Fullscreen
    }, {
        label: "Keys",
        route: `/dashboard/${currentUser?.username}/keys`,
        icon: KeyRound
    }, {
        label: "Chat",
        route: `/dashboard/${currentUser?.username}/chat`,
        icon: MessageSquare
    }, {
        label: "Community",
        route: `/dashboard/${currentUser?.username}/community`,
        icon: Users
    },]

    return (
      <Sidebar className="bg-[#1A1B1E] mt-13 border-none shadow-2xl" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <SidebarTrigger className="md:block hidden" />

            <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
              <h2 className="text-sm font-semibold">For you</h2>
              <p className="text-xs text-muted-foreground">
                Dashboard
              </p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-3">
              {data.map((item, id) => (
                <SidebarUserItem
                  key={id}
                  icon={item.icon}
                  label={item.label}
                  route={item.route}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
  )
}