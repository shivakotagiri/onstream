/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Participant, RemoteTrackPublication, Track, VideoQuality } from "livekit-client";
import { AudioTrack, useTracks, VideoTrack } from "@livekit/components-react";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { Maximize, Minimize, Volume2, VolumeX, PictureInPicture, PictureInPicture2, Play, Pause } from "lucide-react";

interface StreamingProps {
    participant: Participant;
}

const QUALITY_OPTIONS = [
    { label: "Auto",  value: null },
    { label: "1080p", value: VideoQuality.HIGH },
    { label: "720p",  value: VideoQuality.MEDIUM },
    { label: "360p",  value: VideoQuality.LOW },
] as const;

type QualityValue = typeof QUALITY_OPTIONS[number]["value"];

function useStreamTimer() {
    const [elapsed, setElapsed] = useState(0);
    const startRef = useRef<number>(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    if (hours > 0) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function Streaming({ participant }: StreamingProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [isPiPSupported, setIsPiPSupported] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState<QualityValue>(null);
    const [showControls, setShowControls] = useState(false);
    const [clickFlash, setClickFlash] = useState<"play" | "pause" | null>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const streamTimer = useStreamTimer();

    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
        Track.Source.ScreenShare,
        Track.Source.ScreenShareAudio,
    ]);

    const participantTracks = useMemo(
        () => tracks.filter((t) => t.participant.identity === participant.identity),
        [tracks, participant.identity]
    );

    const videoTrack = participantTracks.find(
        (t) => t.source === Track.Source.Camera || t.source === Track.Source.ScreenShare
    );

    const audioTrack = participantTracks.find(
        (t) => t.source === Track.Source.Microphone || t.source === Track.Source.ScreenShareAudio
    );

    useEffect(() => {
        setIsPiPSupported(document.pictureInPictureEnabled);
    }, []);

    useEffect(() => {
        const onEnterPiP = () => setIsPiP(true);
        const onLeavePiP = () => setIsPiP(false);
        document.addEventListener("enterpictureinpicture", onEnterPiP);
        document.addEventListener("leavepictureinpicture", onLeavePiP);
        return () => {
            document.removeEventListener("enterpictureinpicture", onEnterPiP);
            document.removeEventListener("leavepictureinpicture", onLeavePiP);
        };
    }, []);

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    const getVideoElement = useCallback((): HTMLVideoElement | null => {
        if (!wrapperRef.current) return null;
        return wrapperRef.current.querySelector("video");
    }, []);

    const triggerFlash = useCallback((type: "play" | "pause") => {
        setClickFlash(type);
        if (flashTimeout.current) clearTimeout(flashTimeout.current);
        flashTimeout.current = setTimeout(() => setClickFlash(null), 600);
    }, []);

    const togglePause = useCallback(() => {
        if (!paused) {
            const video = getVideoElement();
            const canvas = canvasRef.current;
            if (video && canvas) {
                canvas.width = video.videoWidth || canvas.offsetWidth;
                canvas.height = video.videoHeight || canvas.offsetHeight;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
            triggerFlash("pause");
        } else {
            triggerFlash("play");
        }
        setPaused((prev) => !prev);
    }, [paused, getVideoElement, triggerFlash]);

    const handleVideoClick = useCallback((e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const isControl = target.closest("button, select, input");
        if (isControl) return;
        togglePause();
    }, [togglePause]);

    const togglePiP = useCallback(async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                return;
            }
            const video = getVideoElement();
            if (!video) return;
            await video.requestPictureInPicture();
        } catch (err) {
            console.error("PiP failed:", err);
        }
    }, [getVideoElement]);

    const handleQualityChange = useCallback((quality: QualityValue) => {
        setSelectedQuality(quality);
        if (!videoTrack) return;
        const pub = videoTrack.publication as RemoteTrackPublication;
        pub.setVideoQuality(quality === null ? VideoQuality.HIGH : quality);
    }, [videoTrack]);

    const toggleMute = useCallback(() => setMuted((prev) => !prev), []);

    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        setMuted(val === 0);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!wrapperRef.current) return;
        if (!document.fullscreenElement) {
            wrapperRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    const handleMouseMove = useCallback(() => {
        setShowControls(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => setShowControls(false), 3000);
    }, []);

    return (
        <div
            ref={wrapperRef}
            onClick={handleVideoClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowControls(false)}
            className="relative flex w-full h-full items-center justify-center bg-black overflow-hidden"
        >
            {videoTrack && (
                <VideoTrack
                    trackRef={videoTrack}
                    className="w-full h-full object-contain"
                />
            )}

            <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-contain ${paused ? "block" : "hidden"}`}
            />

            {audioTrack && (
                <AudioTrack
                    trackRef={audioTrack}
                    volume={paused || muted ? 0 : volume}
                />
            )}

            <div className={`absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? "opacity-100" : "opacity-0"}`} />

            {clickFlash && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`bg-black/50 rounded-full p-4 transition-opacity duration-300 ${clickFlash ? "opacity-100" : "opacity-0"}`}>
                        {clickFlash === "pause"
                            ? <Pause className="w-10 h-10 text-white" />
                            : <Play className="w-10 h-10 text-white" />
                        }
                    </div>
                </div>
            )}

            <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                </div>
                <span className={`text-white text-xs font-mono bg-black/50 px-2 py-0.5 rounded transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
                    {streamTimer}
                </span>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-4 transition-opacity duration-300 ${showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <button onClick={(e) => { e.stopPropagation(); togglePause(); }} className="text-white hover:text-white/70 transition-colors cursor-pointer">
                    {paused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>

                <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="text-white hover:text-white/70 transition-colors cursor-pointer">
                    {muted || volume === 0
                        ? <VolumeX className="w-5 h-5" />
                        : <Volume2 className="w-5 h-5" />
                    }
                </button>

                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-24 accent-white cursor-pointer"
                />

                <div className="flex-1 flex items-center">
                    <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-red-500 rounded-full" />
                    </div>
                </div>

                <select
                    value={selectedQuality === null ? "null" : String(selectedQuality)}
                    onChange={(e) => {
                        const raw = e.target.value;
                        handleQualityChange(raw === "null" ? null : (parseInt(raw) as VideoQuality));
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-black/60 text-white text-sm rounded px-2 py-1 border border-white/20 cursor-pointer outline-none"
                >
                    {QUALITY_OPTIONS.map((opt) => (
                        <option key={String(opt.value)} value={String(opt.value)}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {isPiPSupported && (
                    <button onClick={(e) => { e.stopPropagation(); togglePiP(); }} className="text-white hover:text-white/70 transition-colors cursor-pointer">
                        {isPiP
                            ? <PictureInPicture2 className="w-5 h-5" />
                            : <PictureInPicture className="w-5 h-5" />
                        }
                    </button>
                )}

                <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-white hover:text-white/70 transition-colors cursor-pointer">
                    {isFullscreen
                        ? <Minimize className="w-5 h-5" />
                        : <Maximize className="w-5 h-5" />
                    }
                </button>
            </div>
        </div>
    );
}