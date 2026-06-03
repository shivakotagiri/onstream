import { NavbarDashboard } from "./_components/dashboard-navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { redirect } from "next/navigation";
// import { getStreamByUserId } from "@/actions/stream";a
import React from "react";
import { getCurrentUser } from "@/actions/user";

export default async function Layout({ children, params }: {
    children: React.ReactNode,
    params: Promise<{ username: string }>
}) {    
    
    const [currentUser, param] = await Promise.all([getCurrentUser(), params]);
    const username = param.username;

    if(!currentUser?.username || username !== currentUser.username) {
        redirect("/");
    }

    // const streamData = await getStreamByUserId(currentUser.id);

    return (  
        <main className="max-w-screen h-full w-full" suppressHydrationWarning>
            <NavbarDashboard />
            <SidebarProvider className="max-w-screen w-full">
                <div className="flex w-full h-full">
                    <DashboardSidebar currentUser={currentUser} />
                    { children }
                </div>
            </SidebarProvider>
        </main>
    )
}