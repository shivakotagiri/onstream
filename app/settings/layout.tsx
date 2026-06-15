import { Suspense } from "react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { getSession } from "@/lib/get-session"
import { Navbar } from "@/components/navbar"
import { getUsernames } from "@/actions/user"
import { getStreams } from "@/actions/stream"
import Loading from "../(browse)/loading"

async function SettingsLayoutContent({ children }: { children: Readonly<ReactNode> }) {
  const streamData = await getStreams();
  const session = await getSession()
  if (!session || !session.user) redirect("/auth/login")

  return (
    <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
      <Navbar streamData={streamData} session={session} />
      <div className="flex w-full h-full">{children}</div>
    </main>
  )
}

export default function SettingsLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <Suspense fallback={<Loading />}>
      <SettingsLayoutContent>{children}</SettingsLayoutContent>
    </Suspense>
  )
}
