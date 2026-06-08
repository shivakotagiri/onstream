"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { ChatInfo } from "./chat-info";
import { Skeleton } from "@/components/ui/skeleton";
import { SendHorizonal } from "lucide-react";
import { EmoButton } from "./emo-button";

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isChatFollowersOnly: boolean;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isHidden: boolean;
}

export function ChatForm({
    onSubmit,
    value,
    onChange,
    isChatDelayed,
    isChatFollowersOnly,
    isFollowing,
    isChatEnabled,
    isHidden,
}: ChatFormProps) {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);
    const [disable, setDisable] = useState(false);
    const [time, setTime] = useState(0);

    const followersOnlyAndNotFollowing = !isFollowing && isChatFollowersOnly;
    const isDisabled = isDelayBlocked || followersOnlyAndNotFollowing || !isChatEnabled;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (!value || isDisabled) return;

        if (isChatDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
            setDisable(true);
            let countdown = 2;
            setTime(countdown);
            const interval = setInterval(() => {
                countdown--;
                setTime(countdown);
                if (countdown <= 0) {
                    clearInterval(interval);
                    setDisable(false);
                }
            }, 1000);
        }
    }

    if (isHidden) return null;

    return (
        <form onSubmit={handleSubmit} className="shrink-0 border-t">
            <ChatInfo isChatDelayed={isChatDelayed} isFollowersOnly={isChatFollowersOnly} />
            <div className="flex items-center gap-2 px-3 py-3">
                <Input
                    placeholder="Send a message…"
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    disabled={isDisabled}
                    maxLength={200}
                    className="h-9 flex-1 rounded-lg bg-muted/50 border-border/40 text-sm
                               placeholder:text-muted-foreground/50
                               focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/40
                               disabled:opacity-40"
                />
                <div className="flex">
                    <EmoButton />
                    <Button
                        type="submit"
                        size="icon-sm"
                        variant="ghost"
                        disabled={isDisabled || !value}
                        className="size-9 shrink-0 cursor-pointer rounded-lg
                                hover:bg-primary/10 hover:text-primary
                                disabled:opacity-30 transition-colors"
                    >
                        {disable ? (
                            <span className="text-[11px] font-bold tabular-nums text-muted-foreground">
                                {time}s
                            </span>
                        ) : (
                            <SendHorizonal className="size-4" />
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export function ChatFormSkeleton() {
    return (
        <div className="shrink-0 border-t px-3 py-3 flex items-center gap-2">
            <Skeleton className="flex-1 h-9 rounded-lg" />
            <Skeleton className="size-9 rounded-lg shrink-0" />
        </div>
    );
}