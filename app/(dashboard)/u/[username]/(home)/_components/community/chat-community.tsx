/* eslint-disable react-hooks/use-memo */
"use client";

import { useParticipants } from "@livekit/components-react";
import { CommunityItem } from "./community-item";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    hostName: string,
    viewerName: string,
    isHidden: boolean
}

export function ChatCommunity({ hostName, viewerName, isHidden }: ChatCommunityProps) {
    const participants = useParticipants();
    const [value, setValue] = useState<string>("");

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    const filteredParticipant = useMemo(() => {
        
    }, [] as (RemoteParticipant | LocalParticipant)[])

    if(isHidden) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <span className="text-muted-foreground text-sm">Chat is disabled</span>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input
                onChange={onChange}
                value={value}
                placeholder="Search Community"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <span className="last:block hidden text-center text-muted-foreground text-sm">
                    No Results
                </span>
                {participants.map((participant) => (
                    <CommunityItem 
                        key={participant.identity} 
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name || ""}
                        participantIdentity={participant.identity}
                    />
            ))}
            </ScrollArea>
        </div>
    )
}