import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatInfo } from "./chat-info";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
    isOnline: boolean,
    isFollowing: boolean,
    isChatFollowersOnly: boolean,
    isChatDelayed: boolean,
    messages: ReceivedChatMessage[],
    viewerName: string,
    hostName: string | null
}

export function ChatMessages({
    messages,
    isOnline,
    isFollowing,
    isChatFollowersOnly,
    isChatDelayed,
    viewerName,
    hostName
}: ChatMessagesProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);
    return (
        <div className="flex flex-col w-full h-full justify-end px-5 py-3">
            { messages.map((message) => (
                <div className="flex gap-2" key={message.timestamp}>
                    <div className="flex gap-1">
                        <span className="text-primary">{ format(message.timestamp, "HH:MM") }:</span>
                        <span>{ hostName }</span>
                    </div>
                    <span>{ message.message }</span>
                </div>
            ))}
        </div>
    )
}