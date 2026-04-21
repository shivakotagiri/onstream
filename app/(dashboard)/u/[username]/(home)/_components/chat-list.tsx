import { ChatVariant } from "@/store/use-chatbar"
import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessages } from "./chat-messages"
import { CommunityMessages } from "./community-messages"

interface ChatMessagesProps {
    messages: ReceivedChatMessage[],
    isOnline: boolean,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
    hostName: string | null,
    viewerName: string,
    isFollowing: boolean,
    variant: ChatVariant
}

export function ChatList({ 
    messages,
    variant,
    isOnline,
    isFollowing,
    isChatDelayed,
    isChatEnabled,
    isChatFollowersOnly
 }: ChatMessagesProps) {

    if(variant === ChatVariant.CHAT) {
        return <ChatMessages />
    } else {
        return <CommunityMessages />
    }
}