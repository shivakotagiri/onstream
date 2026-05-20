import { ChatVariant } from "@/store/use-chatbar"
import { ReceivedChatMessage } from "@livekit/components-react"
import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage, ChatMessageSkeleton } from "./chat-message"

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
    viewerName,
    isHidden
}: ChatListProps) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

    if(isHidden || messages.length === 0 || !messages) {
        return (
            <div className="flex-1 flex justify-center items-center min-h-0 h-full">
                <span className="text-sm text-muted-foreground">
                    { isHidden ? "Host disabled the chat": "Welcome to the chat!"}
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-1 w-full min-h-0 overflow-y-auto px-5 py-3 h-full justify-end">
            <ScrollArea>
                    {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} viewerName={viewerName} />
                ))}
                <div ref={bottomRef} />
            </ScrollArea>
        </div>
    )
};

export function ChatListSkeleton() {
    return (
        <div className="flex flex-col flex-1 w-full min-h-0 overflow-y-auto px-3 h-full justify-end mb-2">
            <ScrollArea>
                <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((ele) => (
                        <ChatMessageSkeleton key={ele} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}