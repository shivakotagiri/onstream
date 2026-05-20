"use client";

import { UserAvatar } from "@/components/ui/live-avatar";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Check, Users } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
    hostName: string | null,
    hostIdentity: string,
    viewerIdentity: string,
    imageUrl: string | null,
    name: string,
    isFollowing: boolean,
}

export function Header({
    hostIdentity,
    hostName,
    viewerIdentity,
    imageUrl,
    name,
    isFollowing
}: HeaderProps) {

    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 2;
    const isHost = viewerIdentity === `host-${hostIdentity}`;

    return (
        <div className="lg:flex-row flex flex-col gap-y-3 lg:gap-y-0 gap-x-3 px-5 lg:items-center justify-between">
            <div className="flex gap-3">
                <UserAvatar 
                    isLive={isLive}
                    name={name}
                    src={imageUrl || ""}
                    className="size-15"
                    avatarFallbackClassname="text-2xl"
                />
                <div className="flex flex-col items-start justify-center">
                    <div className="flex gap-1 items-center justify-center">
                        <span className="font-semibold text-base">{ hostName }</span>
                        <span className="bg-blue-500 w-3.5 h-3.5 rounded-full flex justify-center items-center">
                            <Check strokeWidth={3.5} className="w-2.5 h-2.5" />
                        </span>
                    </div>
                    <span className="text-sm font-semibold">{ name }</span>
                    { isLive ? <div className="text-rose-500 flex gap-1 items-center justify-center">
                        <Users className="w-4 h-4" />
                        { participantCount } { participantCount <= 1 ? "viewer": "viewers" }
                    </div>: <span className="text-xs text-muted-foreground font-semibold">Offline</span>}
                </div>
            </div>
            <Actions 
                isFollowing={isFollowing}
                hostIdentity={hostIdentity}
                isHost={isHost}
            />
        </div>
    )
}

export function HeaderSkeleton() {
    return (
        <div className="flex lg:flex-row flex-col gap-y-3 lg:gap-y-0 gap-x-3 px-5 justify-between items-center">
            <div className="flex gap-3 justify-center items-center">
                <Skeleton className="size-15 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-40 lg:w-50 h-5"/>
                    <Skeleton className="w-40 lg:w-50 h-2.5"/>
                    <Skeleton className="w-40 lg:w-50 h-2.5"/>
                </div>
            </div>
            <ActionsSkeleton />
        </div>
    )
}