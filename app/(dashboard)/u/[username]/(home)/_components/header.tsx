"use client";

import { UserAvatar } from "@/components/ui/live-avatar";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Check, Users } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
    hostName: string | null;
    hostIdentity: string;
    viewerIdentity: string;
    imageUrl: string | null;
    name: string;
    isFollowing: boolean;
}

export function Header({
    hostIdentity,
    hostName,
    viewerIdentity,
    imageUrl,
    name,
    isFollowing,
}: HeaderProps) {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 1;
    const isHost = viewerIdentity === `host-${hostIdentity}`;

    return (
        <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 gap-x-4 px-5 lg:items-center justify-between">
            <div className="flex gap-3.5 items-center">
                <UserAvatar
                    isLive={isLive}
                    name={name}
                    src={imageUrl || ""}
                    className="size-14 shrink-0"
                    avatarFallbackClassname="text-xl"
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-base truncate">{hostName}</span>
                        <span className="bg-blue-500 size-4 rounded-full flex items-center justify-center shrink-0">
                            <Check strokeWidth={3} className="size-2.5 text-white" />
                        </span>
                    </div>

                    <span className="text-sm text-muted-foreground/80 truncate">{name}</span>

                    <div className="flex items-center gap-1.5 mt-0.5">
                        {isLive ? (
                            <>
                                <span className="relative flex size-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                                    <span className="relative inline-flex rounded-full size-1.5 bg-rose-500" />
                                </span>
                                <span className="text-xs text-rose-500 font-medium">LIVE</span>
                                <span className="text-xs text-muted-foreground/50">·</span>
                                <Users className="size-3 text-muted-foreground/60" />
                                <span className="text-xs text-muted-foreground/60">
                                    {participantCount.toLocaleString()} {participantCount === 1 ? "viewer" : "viewers"}
                                </span>
                            </>
                        ) : (
                            <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-wider">
                                Offline
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <Actions
                isFollowing={isFollowing}
                hostIdentity={hostIdentity}
                isHost={isHost}
            />
        </div>
    );
}

export function HeaderSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 gap-x-4 px-5 justify-between items-start lg:items-center">
            <div className="flex gap-3.5 items-center">
                <Skeleton className="size-14 rounded-full shrink-0" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <ActionsSkeleton />
        </div>
    );
}