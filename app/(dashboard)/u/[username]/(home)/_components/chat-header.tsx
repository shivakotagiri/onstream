import { ChatToggle } from "./chat-toggle";
import { CommunityToggle } from "./community-toggle";

export function ChatHeader() {
    return (
        <div className="h-16 w-full border-b p-3 flex items-center justify-between">
            <ChatToggle />
            <span className="font-semibold text-lg ">
                Stream Chat
            </span>
            <CommunityToggle />
        </div>
    )
}