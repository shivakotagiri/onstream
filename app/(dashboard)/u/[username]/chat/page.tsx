import { getStreamByUserId } from "@/actions/stream"
import { getInfo } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function ChatPage() {
    const data = await getInfo();
    const currentUser = data?.currentUser;
    if(!currentUser) redirect("/");
    const streamData = await getStreamByUserId(currentUser?.id || "");
    return (
        <div>
            Chat Page
        </div>
    )
}







