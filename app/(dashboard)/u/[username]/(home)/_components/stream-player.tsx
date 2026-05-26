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

interface StreamPlayerProps {
    user: User,
    stream: Stream | null,
    isFollowing: boolean,
    followersCount: number,
    followedByList?: FollowedByType[],
    followersOfFollowing?: FollowersType[],
}

export function StreamPlayer({ user, stream, isFollowing, followersCount, followedByList, followersOfFollowing }: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(user.id);
    const { collapsed, onExpand } = useChatSidebarStore();

    if(!token || !name || !identity || !stream) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-56px)]">
                Cannot watch the stream
            </div>
        )
    }

    const isHost = identity === `host-${user.id}`

    return (
        <div className="flex h-[calc(100vh-56px)] w-full">
            <Button
                variant="ghost"
                size="icon-sm"
                className={cn("fixed top-16 right-5 z-10 cursor-pointer", !collapsed && "hidden")}
                onClick={onExpand}
            >
                <ArrowLeftFromLine className="dark:text-white text-black" />
            </Button>
            <LiveKitRoom
                className={cn(
                    "h-full w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-9",
                    collapsed && "lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1"
                )}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
                token={token}
                options={{ dynacast: true, adaptiveStream: true }}
            >
                <div className="col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-7 overflow-y-auto hidden-scrollbar space-y-4">
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
                <div className={cn(
                    "col-span-1 2xl:col-span-2 w-full h-[50vh] lg:h-full overflow-hidden",
                    collapsed && "hidden"
                )}>
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
        <div className="flex h-[calc(100vh-56px)] w-full">
            <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-9">
                <div className="col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-7 overflow-y-auto hidden-scrollbar space-y-4">
                    <VideoSkeleton />
                    <HeaderSkeleton />
                </div>
                <div className="col-span-1 2xl:col-span-2 w-full h-[50vh] lg:h-full overflow-hidden">
                    <ChatSidebarSkeleton />
                </div>
            </div>
        </div>
    )
}