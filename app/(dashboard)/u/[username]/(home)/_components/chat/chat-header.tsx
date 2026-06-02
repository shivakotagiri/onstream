import { Skeleton } from "@/components/ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";

export function ChatHeader() {
    return (
        <div className="h-12 shrink-0 w-full border-b px-3 flex items-center justify-between gap-2">
            <ChatToggle />
            <span className="text-xs font-semibold tracking-widest text-muted-foreground/70">
                Live Chat
            </span>
            <VariantToggle />
        </div>
    )
}

export function ChatHeaderSkeleton() {
    return (
        <div className="h-12 shrink-0 w-full border-b px-3 flex items-center justify-between">
            <Skeleton className="size-7 rounded-md" />
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="size-7 rounded-md" />
        </div>
    )
}