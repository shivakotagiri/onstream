import { ChatVariant } from "@/store/use-chatbar"
import { ReceivedChatMessage } from "@livekit/components-react"
import { useEffect, useRef } from "react"
import { ChatMessage } from "./chat-message"

interface ChatListProps {
    messages: ReceivedChatMessage[],
    isOnline: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
    hostName: string,
    viewerName: string,
    isFollowing: boolean,
    variant: ChatVariant,
    isChatEnabled: boolean,
    isHidden: boolean
}

export function ChatList({ 
    messages,
    hostName,
    isHidden
}: ChatListProps) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

    if(isHidden || messages.length === 0 || !messages) {
        return (
            <div className="w-full lg:h-full h-[60vh] sm:h-[45vh] md:h-[50vh] flex justify-center items-center overflow-y-auto">
                <span className="text-sm text-muted-foreground">
                    { isHidden ? "Host disabled the chat": "Welcome to the chat!"}
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-1  overflow-y-auto px-5 py-3 justify-end">
            {messages.map((message) => (
                <ChatMessage key={message.id} message={message} hostName={hostName} />
            ))}
            <div ref={bottomRef} />
        </div>
    )
}