"use client";

import { chatFollowersOnly } from "@/actions/chat";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export function ChatFollowersOnly({ id, isChatFollowersOnly }: { id: string,  isChatFollowersOnly: boolean }) {

    const [chatFollowers, setChatFollowers] = useState<boolean>(isChatFollowersOnly);

    async function handleChatFollowersOnly() {
        const res = await chatFollowersOnly(id);
        if(res.status) {
            setChatFollowers(prev => !prev);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }
    return (
        <Field orientation={"horizontal"} className="border rounded-sm dark:border-neutral-700 border-neutral-400 p-5">
            <FieldContent>
                <FieldLabel>
                    Followers-Only Mode
                </FieldLabel>
                <FieldDescription>
                    Enable followers-only mode, to restrict the users to allow comments on the chat section who are followed you.
                </FieldDescription>
            </FieldContent>
            <Switch checked={chatFollowers} onCheckedChange={handleChatFollowersOnly} id="switch-focus-mode" className="cursor-pointer" />
        </Field>
    )
}