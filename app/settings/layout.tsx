import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getSession } from "@/lib/get-session";
import { Navbar } from "@/components/navbar";

export default async function SettingsLayout({ children }: {
    children: Readonly<ReactNode>
}) {
    const session = await getSession();
    if(!session || !session.user) redirect("/auth/login");
    return (  
        <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
            <Navbar session={session || null} />
            <div className="flex w-full h-full">
                { children }
            </div>
        </main>
    )
}