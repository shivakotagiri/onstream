import { ChatVariant } from "@/store/use-chatbar"
import { ChatIcon, ReceivedChatMessage } from "@livekit/components-react"
import { useEffect, useRef } from "react"
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
    isHidden: boolean,
}

export function ChatList({ messages, viewerName, isHidden, hostName }: ChatListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center gap-2">
                <div className="size-5 rounded-full bg-muted/60 flex items-center justify-center">
                    <span className="text-base"><ChatIcon /></span>
                </div>
                <p className="text-xs text-muted-foreground/60">
                    {isHidden ? "Chat is disabled" : "Be the first to chat!"}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-2 py-2 hidden-scrollbar">
            <div className="flex-1" />
            <div className="flex flex-col gap-0.5">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        viewerName={viewerName}
                        hostName={hostName}
                    />
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
}

export function ChatListSkeleton() {
    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-2 py-2">
            <div className="flex-1" />
            <div className="flex flex-col gap-0.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ChatMessageSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}