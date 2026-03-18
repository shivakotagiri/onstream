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
import { recommendedUsers } from "@/actions/recommendation";
import { Skeleton } from "./skeleton";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

type recommendationUsersType = {
  image: string | null;
  id: string;
  name: string;
  username: string | null;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  displayUsername: string | null;
  phoneNumber: string | null;
  phoneNumberVerified: boolean | null;
  bio: string | null;
  bannerImage: string | null;
  dob: Date | null;
  sessionVersion: number | null;
}

export function AppSidebar() {
  const [recommendUsers, setRecommendUsers] = useState<recommendationUsersType[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const session = useSession();
  
  async function fetchData() {
    const res = await recommendedUsers();
    if(res) {
      setRecommendUsers(res);
      setStatus(true);
    }
    else setStatus(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    return () => {
      setStatus(false);
      setRecommendUsers([]);
    }
  }, [session]);

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
            {status ? recommendUsers.map((user, id) => (
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