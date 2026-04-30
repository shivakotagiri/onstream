"use client";

import { User, Stream } from "@/db/schema"
import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react"
import { Video } from "./video";
import { ChatSidebar } from "./chat-sidebar";
import { cn } from "@/lib/utils";
import { useChatSidebarStore } from "@/store/use-chatbar";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreamPlayerProps {
    user: User & { stream: Stream | null },
    stream: Stream,
    isFollowing: boolean
}

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(user.id);
    const { collapsed, onExpand } = useChatSidebarStore();

    if(!token || !name || !identity) {
        return <div className="flex justify-center items-center w-full h-[90vh]">
            Cannot watch the stream {token} ------ {name} ---- {identity}
        </div>
    }

    return (
        <div className="flex h-[calc(100vh-56px)] w-full">
            <Button variant={"ghost"} size={"icon-sm"} className={cn("fixed top-17 right-5 block cursor-pointer z-10", !collapsed && "hidden")} onClick={onExpand}>
                <ArrowLeftFromLine className="text-white" />
            </Button>
            <LiveKitRoom 
                className={cn("lg:gap-y-0 h-full w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-9", collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2")}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!} 
                token={token}
                options={{
                    dynacast: true,
                    adaptiveStream: true
                }}
            >
                <div className={cn("space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-7 lg:overflow-y-auto hidden-scrollbar pb-10", !stream.isChatEnabled && "lg:col-span-3 xl:col-span-3 2xl:col-span-9")}>
                    <Video 
                        hostName={user.username || ""}
                        hostIdentity={user.id}
                    />
                </div>
                <div className={cn("col-span-1 lg:col-span-1 2xl:col-span-2 scroll-auto", collapsed && "hidden")}>
                    {stream.isChatEnabled && <ChatSidebar 
                        viewerName={user.name} 
                        hostName={user.username || name} 
                        isFollowing={isFollowing} 
                        hostIdentity={user.id}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                        isChatEnabled={stream.isChatEnabled}
                    />}
                </div>
            </LiveKitRoom>
        </div>
    )
}