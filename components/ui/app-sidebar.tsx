"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarUserItem } from "./sidebar-user-item"
import { Skeleton } from "./skeleton";
import { useEffect } from "react";
import { useRecommendStore } from "@/store/use-recommend-store";

export function AppSidebar({ userId }: { userId: string | null }) {
  const { loading, users, fetchUsers } = useRecommendStore();

  useEffect(() => {
    fetchUsers(userId);
  }, [fetchUsers, userId]);

  return (
    <Sidebar className="bg-[#1A1B1E] mt-13 border-none shadow-2xl" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 mb-5">
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
          <SidebarGroupContent className="flex flex-col gap-5">
            {!loading ? users.map((user, id) => (
              <SidebarUserItem
                key={user.id}
                name={user.name}
                avatar={user.image || ""}
                isLive={id % 2 == 0}
                username={user.username || user.name}
              />
            )): [1, 2, 3].map((user, id) => (
              <SidebarItemSkeleton key={id} />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
  </Sidebar>
)}

function SidebarItemSkeleton() {
  const { state, isMobile } = useSidebar();

  return (
    <div className="flex items-center gap-2 rounded-md">
      <Skeleton className="size-8 rounded-full shrink-0" />
      {(state === "expanded" || !isMobile) && (
        <Skeleton className="h-8 w-full" />
      )}
    </div>
  );
}