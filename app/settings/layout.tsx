import { Suspense } from "react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { getSession } from "@/lib/get-session"
import { Navbar } from "@/components/navbar"

function SettingsLayoutFallback({ children }: { children: Readonly<ReactNode> }) {
  return (
    <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
      <Navbar session={null} />
      <div className="flex w-full h-full">{children}</div>
    </main>
  )
}

async function SettingsLayoutContent({ children }: { children: Readonly<ReactNode> }) {
  const session = await getSession()
  if (!session || !session.user) redirect("/auth/login")

  return (
    <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
      <Navbar session={session} />
      <div className="flex w-full h-full">{children}</div>
    </main>
  )
}

export default function SettingsLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <Suspense fallback={<SettingsLayoutFallback>{children}</SettingsLayoutFallback>}>
      <SettingsLayoutContent>{children}</SettingsLayoutContent>
    </Suspense>
  )
}
