import { Navbar } from "@/components/navbar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getSession } from "@/lib/get-session"
import { Suspense } from "react";
import Loading from "./loading";
import { getStreams } from "@/actions/stream";

async function BrowseLayoutContent({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const streamData = await getStreams();
  return (
    <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
      <Navbar session={session} streamData={streamData}/>
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
    <Suspense fallback={<Loading />}>
      <BrowseLayoutContent>
        {children}
      </BrowseLayoutContent>
    </Suspense>
  )
}
