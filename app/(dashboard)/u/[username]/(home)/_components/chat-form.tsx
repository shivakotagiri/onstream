"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    onSubmit: () => void;
    value: string, 
    onChange: (value: string) => void,
    isChatFollowersOnly: boolean,
    isFollowing: boolean,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isHidden: boolean
}

export function ChatForm({ 
    onSubmit, 
    value, 
    onChange, 
    isChatDelayed, 
    isChatFollowersOnly, 
    isFollowing, 
    isChatEnabled,
    isHidden
}: ChatFormProps) {

    const [isDelayBlocked, setIsDelayBlocked] = useState<boolean>(false);
    const followersOnlyAndNotFollowing = !isFollowing && isChatFollowersOnly;
    const isDisabled =  isDelayBlocked || followersOnlyAndNotFollowing || !isChatEnabled;
    const [disable, setDisable] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        if(!Boolean(value) || isDisabled) return;
        if(isChatDelayed && !isDelayBlocked) {
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

                if(countdown <= 0) {
                    clearInterval(interval);
                    setDisable(false);
                }
            }, 1000);
        }
    }

    if(isHidden) return null;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <ChatInfo
                isChatDelayed={isChatDelayed} 
                isFollowersOnly={isChatFollowersOnly} 
            />
            <div className="flex gap-2 py-5 px-3  border-t">
                <Input
                    placeholder="Send a message" 
                    value={value} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    disabled={false}

                />
                <Button
                    variant={"default"}
                    className="cursor-pointer"
                    type="submit"
                    disabled={isDisabled}
                >
                    {disable ? `send (${time})`: "send"}
                </Button>
            </div>
        </form>
    )
}