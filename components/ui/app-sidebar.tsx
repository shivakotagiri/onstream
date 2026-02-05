import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarUserItem } from "./sidebar-user-item"

export function AppSidebar() {
    const users = [
    {
        id: 1,
        name: "Aarav",
        avatar: "/avatars/aarav.png",
        isLive: true,
    },
    {
        id: 2,
        name: "Neha",
        avatar: "/avatars/neha.png",
        isLive: false,
    },
    {
        id: 3,
        name: "Rahul",
        avatar: "/avatars/rahul.png",
        isLive: true,
    },
    ]

    return (
    <Sidebar className="bg-[#1A1B1E] mt-21 border-none shadow-2xl" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />

          <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <h2 className="text-sm font-semibold">For you</h2>
            <p className="text-xs text-muted-foreground">
              Recommendations
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-1">
            {users.map((user) => (
              <SidebarUserItem
                key={user.id}
                name={user.name}
                avatar={user.avatar}
                isLive={user.isLive}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}