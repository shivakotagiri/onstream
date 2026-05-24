"use client";

import { chatDelayed } from "@/actions/chat";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export function ChatDelayed({ userId, isChatDelayed }: { userId: string, isChatDelayed: boolean }) {
    const [chatDelay, setChatDelay] = useState<boolean>(isChatDelayed);

    async function handleChatDelayed() {
        const res = await chatDelayed(userId, !chatDelay);
        if(res.status) {
            setChatDelay(prev => !prev);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <Field orientation={"horizontal"} className="border rounded-sm dark:border-neutral-700 border-neutral-400 p-5">
            <FieldContent>
                <FieldLabel>
                    Chat Delayed
                </FieldLabel>
                <FieldDescription>
                    Delay the chat reponse to prevent the stream snipe while gaming.
                </FieldDescription>
            </FieldContent>
            <Switch checked={chatDelay} onCheckedChange={handleChatDelayed} id="switch-focus-mode" className="cursor-pointer" />
        </Field>
    )
}