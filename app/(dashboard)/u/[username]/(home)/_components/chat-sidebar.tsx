"use client";

import { useEffect, useMemo, useState } from "react";

import { ChatVariant, useChatSidebarStore } from "@/store/use-chatbar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./community/chat-community";

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
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const isOnline = (participant && connectionState === ConnectionState.Connected) || false;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState<string>("");
    const {chatMessages: messages, send} = useChat();

    const matches = useMediaQuery("max-width: 1024px");

    useEffect(() => {
        if(matches) {
            onExpand()
        }
    }, [matches, onExpand]);

    async function onSubmit () {
        if(!send || !value) return;
        await send(value);
        setValue("");
    }

    function onChange(value: string) {
        setValue(value);
    }

    const reversedMessages = useMemo(() => { 
        return messages.sort((a, b) => a.timestamp - b.timestamp)
    }, [messages]);

    return (
        <div className="w-full flex flex-col lg:border-l h-full max-h-[calc(100vh-85px)] sm:max-h-[calc(100vh-56px)] overflow-hidden">
            <ChatHeader />
            <div className="flex flex-col flex-1 w-full min-h-0">
                {variant === ChatVariant.CHAT && (
                    <>
                        <ChatList 
                            messages={reversedMessages}
                            isOnline={isOnline || false}
                            variant={variant}
                            isChatDelayed={isChatDelayed}
                            isChatFollowersOnly={isChatFollowersOnly}
                            isFollowing={isFollowing}
                            hostName={hostName}
                            viewerName={viewerName}   
                            isChatEnabled={isChatEnabled}
                            isHidden={isHidden}         
                        />
                        <ChatForm 
                            onSubmit={onSubmit}  
                            value={value}
                            onChange={onChange}
                            isChatFollowersOnly={isChatFollowersOnly}
                            isChatDelayed={isChatDelayed}
                            isFollowing={isFollowing}
                            isChatEnabled={isChatEnabled}
                            isHidden={isHidden}
                        />
                    </>
                )}
                {variant === ChatVariant.COMMUNITY && (
                    <>
                        <ChatCommunity 
                            viewerName={viewerName}
                            isHidden={isHidden}
                            hostName={hostName}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export function ChatSidebarSkeleton() {
    return (
        <div className="w-full flex flex-col h-full max-h-[calc(100vh-85px)] sm:max-h-[calc(100vh-56px)] overflow-hidden">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}

