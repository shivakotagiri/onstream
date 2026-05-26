/* eslint-disable react-hooks/purity */
import { ReceivedChatMessage } from "@livekit/components-react";
import { stringToHexColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageProps {
    message: ReceivedChatMessage;
    viewerName: string;
    hostName: string;
}

export function ChatMessage({ message, viewerName, hostName }: ChatMessageProps) {
    const color = stringToHexColor(message.from?.name || "");
    const isHost = message.from?.name === hostName;
    const isViewer = message.from?.name === viewerName;

    return (
        <div className="group flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 px-2 py-1 rounded-md hover:bg-muted/40 transition-colors duration-100">
            <span className="inline-flex items-center gap-1 shrink-0">
                {isHost && (
                    <span className="px-1 py-px rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-400">
                        host
                    </span>
                )}
                {isViewer && !isHost && (
                    <span className="px-1 py-px rounded text-[10px] font-bold tracking-wider uppercase bg-blue-500/15 text-blue-400">
                        you
                    </span>
                )}
                <span
                    className="text-[13px] font-semibold leading-5"
                    style={{ color }}
                >
                    {message.from?.name}
                </span>
            </span>
            <span className="text-[13px] leading-5 text-foreground/80 break-all">
                {message.message}
            </span>
        </div>
    );
}

export function ChatMessageSkeleton() {
    return (
        <div className="flex items-center gap-2 px-2 py-1">
            <Skeleton className="h-3 w-14 rounded shrink-0" />
            <Skeleton className="h-3 rounded" style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }} />
        </div>
    );
}