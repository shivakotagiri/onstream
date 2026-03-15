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
import { recommendedUsers } from "@/actions/recommendation";
import { Skeleton } from "./skeleton";

export async function AppSidebar() {
    const recommendUsers = await recommendedUsers();

    return (
      <Sidebar className="bg-[#1A1B1E] mt-13 border-none shadow-2xl" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <SidebarTrigger className="md:block hidden" />

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
              {recommendUsers.map((user, id) => (
                <SidebarUserItem
                  key={user.id}
                  name={user.name}
                  avatar={user.image || ""}
                  isLive={id % 2 == 0}
                  username={user.username || user.name}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
  )
}


function SidebarItemSkeleton() {
  return (
    <Skeleton className="flex flex-col w-full h-15">
      <Skeleton className="w-5 h-5" />
      <Skeleton className="w-full" />
    </Skeleton>
  )
}