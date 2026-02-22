import { currentUserData } from "@/actions/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function SettingsLayout({ children }: {
    children: Readonly<ReactNode>
}) {
    const currentUser = await currentUserData();
    if(!currentUser) redirect("/auth/login");
    return <>{ children }</>
}