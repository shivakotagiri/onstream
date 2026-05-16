"use client";

import { blockUser } from "@/actions/block-service";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn, stringToHexColor } from "@/lib/utils";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface ChatItemProps {
    participantName: string,
    participantIdentity: string,
    hostName: string,
    viewerName: string,
}

export function CommunityItem({ 
    participantIdentity, 
    participantName, 
    hostName, 
    viewerName 
}: ChatItemProps) {
    const color = stringToHexColor(participantName);
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;
    const [isPending, startTransition] = useTransition();

    function handleBlock() {
        if(!participantIdentity || isSelf || !isHost) return;
        startTransition(() => {
            blockUser(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"));
        })
    }


    return (
        <div className={cn("group flex items-center justify-between w-full p-2 rounded-md text-sm bg-secondary dark:bg-background hover:bg-accent hover:dark:bg-white/5 pl-4", isPending && "opacity-50 pointer-events-none")}>
            <span style={{ color }}>{ participantName }</span>
            {isHost && !isSelf && <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="hover:cursor-pointer"
                        size={"icon-sm"}
                        onClick={handleBlock}
                        disabled={isPending}
                    >
                        <MinusCircle className="h-4 m-4 text-muted-foreground" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-white dark:text-black bg-black text-white px-4 py-1.5 text-sm rounded-sm" side="top">
                    Block
                </TooltipContent>
            </Tooltip>}
        </div>
    )
}