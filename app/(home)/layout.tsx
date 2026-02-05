import { Navbar } from "@/components/navbar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        
            <main className="w-screen h-full">
                <Navbar />
                <SidebarProvider className="max-w-screen w-full">
                    <div className="flex w-full h-full">
                        <AppSidebar />
                        { children }
                    </div>
                </SidebarProvider>
            </main>
    )
}