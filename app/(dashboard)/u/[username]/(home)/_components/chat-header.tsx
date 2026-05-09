import { Skeleton } from "@/components/ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";

export function ChatHeader() {
    return (
        <div className="h-14 w-full border-b p-3 flex items-center justify-between">
            <ChatToggle />
            <span className="font-semibold md:text-lg text-sm">
                Stream Chat
            </span>
            <VariantToggle />
        </div>
    )
}

export function ChatHeaderSkeleton() {
    return (
        <div className="h-14 w-full border flex items-center justify-between">
            <Skeleton className="w-full h-full" />
        </div>
    )
} 