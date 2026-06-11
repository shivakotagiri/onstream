"use client";

import { ConnectionState, Track } from "livekit-client";
import { useRemoteParticipant, useTracks, useConnectionState } from "@livekit/components-react";
import { VideoOffline } from "./offline-video";
import { VideoLoading } from "./video-loading";
import { OnlineVideo } from "./online-video";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSidebarStore } from "@/store/use-chatbar";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";


interface VideoProps {
    hostName: string,
    hostIdentity: string,
}

export function Video({ hostName, hostIdentity }: VideoProps) {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if(!participant && connectionState === ConnectionState.Connected) {
        content = <VideoOffline username={hostName} />
    } else if(!participant || tracks.length === 0) {
        content = <VideoLoading />
    } else {
        content = <OnlineVideo participant={participant} />
    }

    const { collapsed } = useChatSidebarStore();
    const { open } = useSidebar();


    return (
        <div className={cn("aspect-video group relative border-b", collapsed === true && open === false && "aspect-auto w-full h-[90%]")}>
            { content }
        </div>
    )
}

export function VideoSkeleton() {
    return (
        <Skeleton className="aspect-video group relative" />
    )
} 