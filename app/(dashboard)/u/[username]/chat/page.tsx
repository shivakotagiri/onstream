import { getStreamByUserId } from "@/actions/stream";
import { getInfo } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ChatEnabled } from "./_components/chat-enabled";
import { ChatDelayed } from "./_components/chat-delayed";
import { ChatFollowersOnly } from "./_components/chat-followers-only";

export default async function ChatPage() {
    const data = await getInfo();
    if(!data) redirect("/");

    const currentUser = data.currentUser;
    const stream = await getStreamByUserId(currentUser.id);
    if(!stream) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                Stream not found
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-10 md:p-10 p-5 h-screen w-screen md:pt-23 pt-18">
            <div className="font-semibold text-3xl">
                Chat Settings
            </div>
            <ChatEnabled userId={stream.userId} isChatEnabled={stream.isChatEnabled} />
            <ChatDelayed userId={stream.userId} isChatDelayed={stream.isChatDelayed} />
            <ChatFollowersOnly userId={stream.userId} isChatFollowersOnly={stream.isChatFollowersOnly} />
        </div>
    )
}
