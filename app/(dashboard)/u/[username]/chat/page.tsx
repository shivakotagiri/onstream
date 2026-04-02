import { getInfo } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function ChatPage() {
    const data = await getInfo();
    const currentUser = data?.currentUser || null;
    if(!currentUser) redirect("/");
    return (
        <div>
            Chat Page
        </div>
    )
}







