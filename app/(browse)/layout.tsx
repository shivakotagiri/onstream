import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getSession } from "@/lib/get-session"

function BrowseLayoutFallback({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
      <Navbar session={null} />
      <SidebarProvider className="max-w-screen w-full">
        <div className="flex w-full h-full">
          <AppSidebar userId={null} />
          {children}
        </div>
      </SidebarProvider>
    </main>
  )
}

async function BrowseLayoutContent({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  return (
    <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
      <Navbar session={session} />
      <SidebarProvider className="max-w-screen w-full">
        <div className="flex w-full h-full">
          <AppSidebar userId={session?.user.id || null} />
          {children}
        </div>
      </SidebarProvider>
    </main>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<BrowseLayoutFallback>{children}</BrowseLayoutFallback>}>
      <BrowseLayoutContent>{children}</BrowseLayoutContent>
    </Suspense>
  )
}
