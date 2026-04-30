"use client";

import { useEffect, useMemo, useState } from "react";

import { ChatVariant, useChatSidebarStore } from "@/store/use-chatbar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { ChatInfo } from "./chat-info";
import { CommunityList } from "./community-list";

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
    const isOnline = (participant && connectionState === ConnectionState.Connected) || false;

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
        <div className="w-full h-full flex flex-col max-h-[calc(60vh-56px)] sm:max-h-[calc(100vh-56px)]">
            <ChatHeader />
            <div className="flex flex-col flex-1 min-h-0">
                {variant === ChatVariant.CHAT ? <ChatList 
                    messages={reversedMessages}
                    isOnline={isOnline || false}
                    variant={variant}
                    isChatDelayed={isChatDelayed}
                    isChatFollowersOnly={isChatFollowersOnly}
                    isFollowing={isFollowing}
                    hostName={hostName}
                    viewerName={viewerName}            
                /> : <CommunityList />}
            </div>
            <ChatInfo 
                isChatDelayed={isChatDelayed} 
                isFollowersOnly={isChatFollowersOnly} 
            />
            <ChatForm 
                onSubmit={onSubmit}  
                value={value}
                onChange={onChange}
                isChatFollowersOnly={isChatFollowersOnly}
                isChatDelayed={isChatDelayed}
                isFollowing={isFollowing}
                isChatEnabled={isChatEnabled}
            />
        </div>
    )
}