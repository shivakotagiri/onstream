"use client";

import { ConnectionState, Track } from "livekit-client";
import { useRemoteParticipant, useTracks, useConnectionState } from "@livekit/components-react";
import { VideoOffline } from "./offline-video";
import { VideoLoading } from "./video-loading";
import { Streaming } from "./streaming";


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
        content = <Streaming participant={participant} />
    }


    return (
        <div className="aspect-video border-b group relative w-full h-full">
            { content }
        </div>
    )
}