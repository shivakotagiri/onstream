"use client";

import { useEffect, useMemo, useState } from "react";

import { useChatSidebarStore } from "@/store/use-chatbar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { ChatInfo } from "./chat-info";

interface ChatSidebarProps {
    isFollowing: boolean;
    viewerName: string,
    hostName: string,
    hostIdentity: string,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
    isChatEnabled: boolean
}

export function ChatSidebar({
    isFollowing, 
    viewerName, 
    hostName, 
    hostIdentity, 
    isChatDelayed, 
    isChatFollowersOnly,
    isChatEnabled
}: ChatSidebarProps) {

    const { variant, onExpand } = useChatSidebarStore();
    const participant = useRemoteParticipant(hostIdentity);
    const connectionState = useConnectionState();
    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState<string>("");
    const {chatMessages: messages, send} = useChat();

    const matches = useMediaQuery("max-width: 1024px");

    async function onSubmit () {
        if(!send || !value) return;
        await send(value);
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
        return messages.sort((a, b) => a.timestamp - b.timestamp)
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
                isFollowing={isFollowing}
                hostName={hostName}
                viewerName={viewerName}            
            />
            <ChatInfo 
                isChatDelayed={isChatDelayed} 
                isFollowersOnly={isChatFollowersOnly} 
            />
            <ChatForm 
                onSubmit={onSubmit}  
                value={value}
                onChange={onChange}
                isHidden={isHidden}
                isChatFollowersOnly={isChatFollowersOnly}
                isChatDelayed={isChatDelayed}
                isFollowing={isFollowing}
                isChatEnabled={isChatEnabled}
            />
        </div>
    )
}