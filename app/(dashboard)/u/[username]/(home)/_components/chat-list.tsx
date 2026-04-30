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
    variant: ChatVariant
}

export function ChatList({ 
    messages,
    hostName
}: ChatListProps) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  return (
      <div className="flex-1 overflow-y-auto px-5 py-3">
          {messages.map((message) => (
              <ChatMessage key={message.id} message={message} hostName={hostName} />
          ))}
          <div ref={bottomRef} />
      </div>
  )
}