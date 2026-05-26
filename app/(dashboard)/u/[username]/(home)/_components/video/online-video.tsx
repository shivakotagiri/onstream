"use client";

import { useTracks, VideoTrack, AudioTrack } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useMemo } from "react";

interface StreamingProps {
    participant: Participant;
}

export function OnlineVideo({ participant }: StreamingProps) {
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]);

    const videoTrack = useMemo(() =>
        tracks.find(
            (t) =>
                t.participant.identity === participant.identity &&
                t.source === Track.Source.Camera
        ),
        [tracks, participant.identity]
    );

    const audioTrack = useMemo(() =>
        tracks.find(
            (t) =>
                t.participant.identity === participant.identity &&
                t.source === Track.Source.Microphone
        ),
        [tracks, participant.identity]
    );

    return (
        <div className="absolute inset-0">
            {videoTrack && (
                <VideoTrack
                    trackRef={videoTrack}
                    className="w-full h-full object-cover"
                />
            )}
            {audioTrack && (
                <AudioTrack
                    key={audioTrack.publication.trackSid}
                    trackRef={audioTrack}
                />
            )}
        </div>
    );
}