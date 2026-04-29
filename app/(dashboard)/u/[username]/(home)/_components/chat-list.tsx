import { ChatVariant } from "@/store/use-chatbar"
import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessages } from "./chat-messages"
import { CommunityMessages } from "./community-messages"

interface ChatMessagesProps {
    messages: ReceivedChatMessage[],
    isOnline: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
    hostName: string,
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
    isChatFollowersOnly,
    viewerName,
    hostName
 }: ChatMessagesProps) {

    if(variant === ChatVariant.CHAT) {
        return (
            <ChatMessages 
                messages={messages} 
                isOnline={isOnline} 
                viewerName={viewerName}
                isFollowing={isFollowing} 
                isChatDelayed={isChatDelayed}
                isChatFollowersOnly={isChatFollowersOnly}
                hostName={hostName}
            />
        )
    } else {
        return <CommunityMessages />
    }
}