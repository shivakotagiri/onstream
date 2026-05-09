"use client";

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
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
            return "Chat is delayed";
        } 

        if(isChatDelayed && isFollowersOnly) {
            return "Followers only and chat is delayed";
        }

        return "";
    }, [isChatDelayed, isFollowersOnly]);

    const hint = useMemo(() => {
        if(isFollowersOnly && !isChatDelayed) {
            return "Only followers can chat";
        } 

        if(isChatDelayed && !isFollowersOnly) {
            return "The chat messages are delayed for 3 seconds";
        } 

        if(isChatDelayed && isFollowersOnly) {
            return "Only followers can chat. Messages are delayed for 3 seconds";
        }

        return "";
    }, [isChatDelayed, isFollowersOnly]);


    if(!isChatDelayed && !isFollowersOnly) return null;

    return (
        <div className="flex bg-muted justify-start items-center p-3 my-3 mx-2 border rounded-2xl gap-2">
            <Tooltip>
                <TooltipTrigger className="cursor-pointer" asChild>
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={25}>
                    <span className="py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-sm text-xs">{ hint } </span>
                </TooltipContent>
            </Tooltip>
            <span className="text-sm">{ label }</span>
        </div>
    )
}