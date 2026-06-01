import { Navbar } from "@/components/navbar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getInfo } from "@/lib/get-session"

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const data = await getInfo();
    const session = data?.session || null;
    return (  
        <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
            <Navbar session={session} />
            <SidebarProvider className="max-w-screen w-full">
                <div className="flex w-full h-full">
                    <AppSidebar userId={session?.user.id || null} />
                    { children }
                </div>
            </SidebarProvider>
        </main>
    )
}