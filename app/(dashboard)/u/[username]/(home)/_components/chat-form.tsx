"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";

interface ChatFormProps {
    onSubmit: () => void;
    value: string, 
    onChange: (value: string) => void,
    isHidden: boolean,
    isChatFollowersOnly: boolean,
    isFollowing: boolean,
    isChatEnabled: boolean,
    isChatDelayed: boolean
}

export function ChatForm({ 
    onSubmit, 
    value, 
    onChange, 
    isChatDelayed, 
    isChatFollowersOnly, 
    isFollowing, 
    isHidden 
}: ChatFormProps) {

    const [isDelayBlocked, setIsDelayBlocked] = useState<boolean>(false);
    const followersOnlyAndNotFollowing = !isFollowing && isChatFollowersOnly;
    const isDisabled = isHidden || isDelayBlocked || followersOnlyAndNotFollowing

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        if(!Boolean(value.trim()) || isDisabled) return;
        if(isChatDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    }

    if(isHidden) {
        return null;
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 py-5 px-3  border-t">
            <Input
                placeholder="Send a message" 
                value={value} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} 
            />
            <Button
                variant={"default"}
                className="cursor-pointer"
                type="submit"
            >
                Send
            </Button>
        </form>
    )
}