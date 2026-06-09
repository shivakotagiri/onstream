"use client";

import { User, Stream } from "@/db/schema"
import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react"
import { ChatSidebar, ChatSidebarSkeleton } from "./chat/chat-sidebar";
import { cn } from "@/lib/utils";
import { useChatSidebarStore } from "@/store/use-chatbar";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header, HeaderSkeleton } from "./header";
import { Video, VideoSkeleton } from "./video";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
import { FollowedByType, FollowersType } from "@/actions/followers";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const MIN_CHAT_WIDTH = 280;
const MAX_CHAT_WIDTH = 600;
const DEFAULT_CHAT_WIDTH = 340;

interface StreamPlayerProps {
    user: User,
    stream: {
        id: string
        thumbnailUrl: string | null,
        name: string,
        isChatDelayed: boolean,
        isChatFollowersOnly: boolean,
        isChatEnabled: boolean,
        userId: string,
        isLive: boolean,
    } | null,
    isFollowing: boolean,
    followersCount: number,
    followedByList?: FollowedByType[],
    followersOfFollowing?: FollowersType[],
}

export function StreamPlayer({ user, stream, isFollowing, followersCount, followedByList, followersOfFollowing }: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(user.id);
    const { collapsed, onExpand } = useChatSidebarStore();
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const [chatWidth, setChatWidth] = useState(DEFAULT_CHAT_WIDTH);
    const isResizing = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(0);

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (!isResizing.current) return;
            const delta = startX.current - e.clientX;
            const next = Math.min(Math.max(startWidth.current + delta, MIN_CHAT_WIDTH), MAX_CHAT_WIDTH);
            setChatWidth(next);
        }

        function onMouseUp() {
            if (!isResizing.current) return;
            isResizing.current = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    function onResizeStart(e: React.MouseEvent) {
        e.preventDefault();
        isResizing.current = true;
        startX.current = e.clientX;
        startWidth.current = chatWidth;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    }

    if (!token || !name || !identity || !stream) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-56px)]">
                Cannot watch the stream
            </div>
        )
    }

    const isHost = identity === `host-${user.id}`;

    return (
        <div className="flex h-[calc(100vh-65px)] w-full">
            <Button
                variant="ghost"
                size="icon-sm"
                className={cn("fixed top-16 right-5 z-10 cursor-pointer", !collapsed && "hidden")}
                onClick={onExpand}
            >
                <ArrowLeftFromLine className="dark:text-white text-white/80" />
            </Button>

            <LiveKitRoom
                className="h-full w-full flex flex-col lg:flex-row"
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
                token={token}
                options={{ dynacast: true, adaptiveStream: true }}
            >
                <div className="flex-1 min-w-0 overflow-y-auto hidden-scrollbar space-y-4">
                    <Video
                        hostName={user.username || ""}
                        hostIdentity={user.id}
                    />
                    <Header
                        viewerIdentity={identity}
                        hostName={user.username}
                        hostIdentity={user.id}
                        name={stream.name}
                        isFollowing={isFollowing}
                        imageUrl={user.image}
                    />
                    {isHost && (
                        <InfoCard
                            hostIdentity={user.id}
                            initialThumbnailUrl={stream.thumbnailUrl}
                            initialName={stream.name}
                        />
                    )}
                    <AboutCard
                        hostName={user.username || ""}
                        hostIdentity={user.id}
                        followersCount={followersCount}
                        bio={user.bio || ""}
                        viewerIdentity={identity}
                        followedByList={followedByList || []}
                        followersOfFollowing={followersOfFollowing || []}
                    />
                </div>

                <div
                    className={cn(
                        "relative shrink-0 overflow-hidden",
                        "h-[50vh] w-full lg:h-full",
                        collapsed && "hidden"
                    )}
                    style={isDesktop ? { width: chatWidth } : undefined}
                >
                    <div 
                        onMouseDown={onResizeStart}
                        className="hidden lg:block absolute left-0 top-0 w-1.5 h-full z-10 cursor-col-resize bg-transparent hover:bg-primary/20 active:bg-primary/40 transition-colors duration-150"
                    />
                    <ChatSidebar
                        viewerName={name}
                        hostName={user.username || ""}
                        isFollowing={isFollowing}
                        hostIdentity={user.id}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                        isChatEnabled={stream.isChatEnabled}
                    />
                </div>
            </LiveKitRoom>
        </div>
    )
}

export function StreamPlayerSkeleton() {
    return (
        <div className="flex h-[calc(100vh-56px)] w-full flex-col lg:flex-row">
            <div className="flex-1 min-w-0 overflow-y-auto hidden-scrollbar space-y-4">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="h-[50vh] w-full lg:h-full lg:w-80 shrink-0 overflow-hidden">
                <ChatSidebarSkeleton />
            </div>
        </div>
    )
}