import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getInfo } from "@/lib/get-session";
import { Navbar } from "@/components/navbar";

export default async function SettingsLayout({ children }: {
    children: Readonly<ReactNode>
}) {
    const data = await getInfo();
    const currentUser = data?.currentUser || null;
    if(!currentUser) redirect("/auth/login");
    return (  
        <main className="w-screen min-h-screen overflow-hidden" suppressHydrationWarning>
            <Navbar session={data?.session || null} />
            <div className="flex w-full h-full">
                { children }
            </div>
        </main>
    )
}