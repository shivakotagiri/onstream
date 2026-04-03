import { NavbarDashboard } from "./_components/dashboard-navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { getInfo } from "@/lib/get-session";
import { redirect } from "next/navigation";
// import { getStreamByUserId } from "@/actions/stream";a
import React from "react";

export default async function Layout({ children, params }: {
    children: React.ReactNode,
    params: Promise<{ username: string }>
}) {    
    

    
    const [data, param] = await Promise.all([getInfo(), params]);
    const currentUser = data?.currentUser || null;
    const username = param.username;

    if(!currentUser?.username || username !== currentUser.username) {
        redirect("/");
    }

    // const streamData = await getStreamByUserId(currentUser.id);

    return (  
        <main className="w-screen h-full">
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