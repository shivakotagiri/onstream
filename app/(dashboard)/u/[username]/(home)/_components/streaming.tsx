/* eslint-disable react-hooks/refs */
"use client";

import { Participant, Track } from "livekit-client"
import { useTracks } from "@livekit/components-react"
import { useRef } from "react"

interface StreamingProps {
    participant: Participant
}

export function Streaming({ participant }: StreamingProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track) => track.participant.identity === participant.identity).forEach((track) => {
        if(videoRef.current) {
            track.publication.track?.attach(videoRef.current);
        }
    })
    return (
        <div ref={wrapperRef} className="flex w-full h-full items-center justify-center">
            <video width={"100%"} ref={videoRef} />
        </div>
    )
}