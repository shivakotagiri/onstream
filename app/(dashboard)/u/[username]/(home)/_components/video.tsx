"use client";

import { ConnectionState, Track } from "livekit-client";
import { useRemoteParticipant, useTracks, useConnectionState } from "@livekit/components-react";
import { VideoOffline } from "./offline-video";
import { VideoLoading } from "./video-loading";


interface VideoProps {
    hostName: string,
    hostIdentity: string,
}

export function Video({ hostName, hostIdentity }: VideoProps) {
    const connectionState = useConnectionState();
    const pariticipant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if(!pariticipant && connectionState === ConnectionState.Connected) {
        content = <VideoOffline username={hostName} />
    } else if(!pariticipant || tracks.length === 0) {
        content = <VideoLoading />
    } else {
        content = <p>host is streaming</p>
    }


    return (
        <div className="aspect-video border-b group relative w-full h-full">
            { content }
        </div>
    )
}