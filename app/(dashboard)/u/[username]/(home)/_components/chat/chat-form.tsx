"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { ChatInfo } from "./chat-info";
import { Skeleton } from "@/components/ui/skeleton";
import { SendHorizonal } from "lucide-react";
import { EmoButton } from "./emo-button";

interface ChatFormProps {
    onSubmit: (data: string) => void;
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
                onSubmit(JSON.stringify({
                    value,
                    type: "string"
                }));
            }, 3000);
        } else {
            onSubmit(JSON.stringify({
                value,
                type: "string"
            }));
            
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
                    className="h-9 flex-1 rounded-lg bg-muted/50 border-border/40 text-sm placeholder:text-muted-foreground/50 disabled:opacity-40"
                />
                <div className="flex">
                    <EmoButton 
                        onSubmit={onSubmit}
                        isDisabled={isDisabled}
                        isChatDelayed={isChatDelayed}
                        isDelayBlocked={isDelayBlocked}
                        setIsDelayBlocked={setIsDelayBlocked}
                    />
                    <Button
                        type="submit"
                        size="icon-sm"
                        variant="ghost"
                        disabled={isDisabled || !value}
                        className="size-9 shrink-0 cursor-pointer rounded-lg
                                hover:bg-primary/10 hover:text-primary
                                disabled:opacity-30 transition-colors"
                    >
                        <SendHorizonal className="size-4" />
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