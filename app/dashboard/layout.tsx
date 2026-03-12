import { NavbarDashboard } from "./_components/dashboard-navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { getCurrentUser } from "@/actions/user";

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    return (  
        <main className="w-screen h-full">
            <NavbarDashboard />
            <SidebarProvider className="max-w-screen w-full">
                <div className="flex w-full h-full mt-13">
                    <DashboardSidebar currentUser={currentUser} />
                    { children }
                </div>
            </SidebarProvider>
        </main>
    )
}