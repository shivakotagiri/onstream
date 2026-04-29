"use client";

import { AlertCircle } from "lucide-react";
import { useMemo } from "react";

interface ChatInfoProps {
    isChatDelayed: boolean,
    isFollowersOnly: boolean
}

export function ChatInfo({ isChatDelayed, isFollowersOnly}: ChatInfoProps) {
    const label = useMemo(() => {
        if(isFollowersOnly && !isChatDelayed) {
            return "Followers only";
        } 

        if(isChatDelayed && !isFollowersOnly) {
            return "The chat is delayed";
        } 

        if(isChatDelayed && isFollowersOnly) {
            return "Followers only and chat is delayed";
        }

        return "";
    }, [isChatDelayed, isFollowersOnly]);


    if(!isChatDelayed && !isFollowersOnly) return null;

    return (
        <div className="flex bg-muted justify-start items-center p-3 my-3 mx-2 border rounded-2xl gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{ label }</span>
        </div>
    )
}