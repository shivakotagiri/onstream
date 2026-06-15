"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StreamingProps {
  participant: Participant;
  isHost: boolean;
}

export function OnlineVideo({ participant, isHost }: StreamingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);

  const videoTrackRef = useMemo(
    () =>
      tracks.find(
        (t) =>
          t.participant.identity === participant.identity &&
          t.source === Track.Source.Camera
      ),
    [tracks, participant.identity]
  );

  const audioTrackRef = useMemo(
    () =>
      tracks.find(
        (t) =>
          t.participant.identity === participant.identity &&
          t.source === Track.Source.Microphone
      ),
    [tracks, participant.identity]
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const v = videoTrackRef?.publication.track;
    const a = isHost ? undefined : audioTrackRef?.publication.track;

    v?.attach(el);
    a?.attach(el);

    return () => {
      v?.detach(el);
      a?.detach(el);
    };
  }, [videoTrackRef?.publication.track, audioTrackRef?.publication.track, isHost]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = volume;
    el.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    const v = localStorage.getItem("stream-volume");
    const m = localStorage.getItem("stream-muted");
    if (v !== null && !isNaN(parseFloat(v))) setVolume(parseFloat(v));
    if (m === "true") setIsMuted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("stream-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("stream-muted", String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onEnter = () => setIsPiP(true);
    const onLeave = () => setIsPiP(false);
    el.addEventListener("enterpictureinpicture", onEnter);
    el.addEventListener("leavepictureinpicture", onLeave);
    return () => {
      el.removeEventListener("enterpictureinpicture", onEnter);
      el.removeEventListener("leavepictureinpicture", onLeave);
    };
  }, []);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2500);
  }, []);

  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const onVolumeChange = useCallback((v: number) => {
    setVolume(v);
    if (v > 0) setIsMuted(false);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {}
  }, []);

  const togglePiP = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      if (document.pictureInPictureElement === el) {
        await document.exitPictureInPicture();
      } else {
        await el.requestPictureInPicture();
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t?.isContentEditable
      ) return;
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" && !isHost) {
        toggleMute();
      } else if (e.key === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, toggleMute, toggleFullscreen, isHost]);

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={containerRef}
        onMouseMove={showControls}
        onMouseLeave={() => setControlsVisible(false)}
        className="absolute inset-0 bg-black overflow-hidden"
      >
        <video
          ref={videoRef}
          onClick={togglePlay}
          autoPlay
          playsInline
          className="w-full h-full aspect-video object-center object-contain cursor-pointer"
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 px-3 pb-2 pt-10",
            "bg-linear-to-t from-black/80 via-black/40 to-transparent",
            "transition-opacity duration-200",
            controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-1 text-white">
            <IconControl
              label={isPlaying ? "Pause (k)" : "Play (k)"}
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
            </IconControl>

            {!isHost && (
              <div className="flex items-center group/vol">
                <IconControl
                  label={isMuted ? "Unmute (m)" : "Mute (m)"}
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-5" />
                  ) : (
                    <Volume2 className="size-5" />
                  )}
                </IconControl>
                <div className="w-24 overflow-hidden group-hover/vol:w-24 transition-[width] duration-200 px-1">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={([v]) => onVolumeChange(v)}
                    max={1}
                    step={0.01}
                    aria-label="Volume"
                    className="w-22"
                  />
                </div>
              </div>
            )}

            <div className="flex-1" />

            <IconControl label="Picture in picture" onClick={togglePiP}>
              <PictureInPicture2
                className={cn("size-5", isPiP && "text-primary")}
              />
            </IconControl>

            <IconControl
              label={isFullscreen ? "Exit fullscreen (f)" : "Fullscreen (f)"}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="size-5" />
              ) : (
                <Maximize className="size-5" />
              )}
            </IconControl>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function IconControl({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClick}
          aria-label={label}
          className="text-white hover:bg-white/10 hover:text-white cursor-pointer"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}