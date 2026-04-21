"use client";

import { useEffect, useMemo, useState } from "react";

import { useChatSidebarStore } from "@/store/use-chatbar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";

interface ChatSidebarProps {
    isFollowing: boolean;
    viewerName: string,
    hostName: string | null,
    hostIdentity: string,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
}

export function ChatSidebar({
    isFollowing, 
    viewerName, 
    hostName, 
    hostIdentity, 
    isChatDelayed, 
    isChatEnabled, 
    isChatFollowersOnly
}: ChatSidebarProps) {

    const { variant, onExpand } = useChatSidebarStore();
    const participant = useRemoteParticipant(hostIdentity);
    const connectionState = useConnectionState();
    const isOnline = participant && connectionState === ConnectionState.Connected;

    const [value, setValue] = useState<string>("");
    const {chatMessages: messages, send} = useChat();

    const matches = useMediaQuery("max-width: 1024px");

    function onSubmit () {
        if(!send) return;
        send(value);
        setValue("");
    }

    function onChange(value: string) {
        setValue(value);
    }

    useEffect(() => {
        if(matches) {
            onExpand()
        }
    }, [matches, onExpand]);

    const reversedMessages = useMemo(() => { 
        return messages.sort((a, b) => b.timestamp - a.timestamp)
    }, [messages]);

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <ChatHeader />
            <ChatList 
                messages={reversedMessages} 
                isOnline={isOnline || false}
                variant={variant}
                isChatDelayed={isChatDelayed}
                isChatFollowersOnly={isChatFollowersOnly}
                isChatEnabled={isChatEnabled}
                isFollowing={isFollowing}
                hostName={hostName}
                viewerName={viewerName}
            />
            <ChatForm 
                onSubmit={onSubmit}  
                value={value}
                onChange={onChange}
            />
        </div>
    )
}