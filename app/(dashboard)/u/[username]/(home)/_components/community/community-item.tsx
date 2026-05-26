"use client";

import { onBlock } from "@/actions/block-service";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, stringToHexColor } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface ChatItemProps {
    participantName: string;
    participantIdentity: string;
    hostName: string;
    viewerName: string;
}

export function CommunityItem({
    participantIdentity,
    participantName,
    hostName,
    viewerName,
}: ChatItemProps) {
    const color = stringToHexColor(participantName);
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;
    const [isPending, startTransition] = useTransition();

    function handleBlock() {
        if (!participantIdentity || isSelf || !isHost) return;
        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <div
            className={cn(
                "group flex items-center justify-between w-full px-2 py-1.5 rounded-md",
                "hover:bg-muted/40 transition-colors duration-100",
                isPending && "opacity-40 pointer-events-none"
            )}
        >
            <div className="flex items-center gap-2 min-w-0">
                <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                />
                <span
                    className="text-[13px] font-medium truncate"
                    style={{ color }}
                >
                    {participantName}
                </span>
                {isSelf && (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-1 py-px rounded bg-blue-500/15 text-blue-400 shrink-0">
                        you
                    </span>
                )}
            </div>

            {isHost && !isSelf && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={handleBlock}
                            disabled={isPending}
                            className="opacity-0 group-hover:opacity-100 transition-opacity
                                       size-7 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                        >
                            <MinusCircle className="size-3.5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                        Block user
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    );
}