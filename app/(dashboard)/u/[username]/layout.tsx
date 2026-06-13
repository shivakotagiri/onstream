import { Suspense } from "react"
import { NavbarDashboard } from "./_components/dashboard-navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { redirect } from "next/navigation"
import { getCurrentUser, getUsernames } from "@/actions/user"

function DashboardLayoutFallback({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-screen h-full w-full" suppressHydrationWarning>
      <NavbarDashboard session={null} data={[]} />
      <SidebarProvider className="max-w-screen w-full">
        <div className="flex w-full h-full">
          <DashboardSidebar currentUser={null} />
          {children}
        </div>
      </SidebarProvider>
    </main>
  )
}

async function DashboardLayoutContent({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ username: string }>
}) {
  const [currentUser, param] = await Promise.all([getCurrentUser(), params])
  const username = param.username;

  const data = await getUsernames();

  if (!currentUser?.username || username !== currentUser.username) {
    redirect("/")
  }

  return (
    <main className="max-w-screen h-full w-full" suppressHydrationWarning>
      <NavbarDashboard session={null} data={data} />
      <SidebarProvider className="max-w-screen w-full">
        <div className="flex w-full h-full">
          <DashboardSidebar currentUser={currentUser} />
          {children}
        </div>
      </SidebarProvider>
    </main>
  )
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ username: string }>
}) {
  return (
    <Suspense fallback={<DashboardLayoutFallback>{children}</DashboardLayoutFallback>}>
      <DashboardLayoutContent params={params}>{children}</DashboardLayoutContent>
    </Suspense>
  )
}
