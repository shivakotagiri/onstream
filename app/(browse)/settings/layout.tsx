import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getInfo } from "@/lib/get-session";

export default async function SettingsLayout({ children }: {
    children: Readonly<ReactNode>
}) {
    const data = await getInfo();
    const currentUser = data?.currentUser || null;
    if(!currentUser) redirect("/auth/login");
    return (
        <>
            { children }
        </>
    )
}


