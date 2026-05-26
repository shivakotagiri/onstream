"use client";

import { useParticipants } from "@livekit/components-react";
import { CommunityItem } from "./community-item";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useMemo, useState } from "react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useDebounceValue } from "usehooks-ts";
import { Users } from "lucide-react";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export function ChatCommunity({ hostName, viewerName, isHidden }: ChatCommunityProps) {
    const participants = useParticipants();
    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounceValue<string>(value, 500);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((p) =>
            p.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        );
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <p className="text-sm text-muted-foreground/60">Chat is disabled</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="px-3 pt-3 pb-2 shrink-0">
                <Input
                    onChange={onChange}
                    value={value}
                    placeholder="Search viewers…"
                    className="h-9 rounded-lg bg-muted/50 border-border/40 text-sm
                               placeholder:text-muted-foreground/50
                               focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/40"
                />
            </div>

            <div className="flex items-center gap-1.5 px-4 py-1 shrink-0">
                <Users className="size-3 text-muted-foreground/50" />
                <span className="text-[11px] text-muted-foreground/50 font-medium tracking-wide uppercase">
                    {filteredParticipants.length} viewers
                </span>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto hidden-scrollbar px-2 pb-2">
                {filteredParticipants.length === 0 && (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-xs text-muted-foreground/50">No results</p>
                    </div>
                )}
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name || ""}
                        participantIdentity={participant.identity}
                    />
                ))}
            </div>
        </div>
    );
}