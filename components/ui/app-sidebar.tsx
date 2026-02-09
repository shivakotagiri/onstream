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
import { usersData } from "@/actions/user-data"
import { getSession } from "@/lib/get-session";

export async function AppSidebar() {
    const usersInfo = (await usersData()).filter(({ emailVerified }) => emailVerified === true); 
    const session = await getSession();

    const users = (session && session.user) ? usersInfo.filter(({ id }) => id !== session.user.id): usersInfo;

    return (
      <Sidebar className="bg-[#1A1B1E] mt-21 border-none shadow-2xl" collapsible="icon">
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
              {users.map((user, id) => (
                <SidebarUserItem
                  key={user.id}
                  name={user.name}
                  avatar={user.image || ""}
                  isLive={id % 2 == 0}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
  )
}