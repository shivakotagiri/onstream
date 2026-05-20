"use client";

import { chatEnabled } from "@/actions/chat";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export function ChatEnabled({ id, isChatEnabled }: { id: string, isChatEnabled: boolean }) {
    const [chatEnable, setChatEnable] = useState<boolean>(isChatEnabled);

    async function handleChatEnable() {
        const res = await chatEnabled(id, chatEnable);
        if(res.status) {
            setChatEnable(prev => !prev);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }
    return (
        <Field orientation={"horizontal"} className="border rounded-sm dark:border-neutral-700 border-neutral-400 p-5">
            <FieldContent>
                <FieldLabel>
                    Chat Enabled
                </FieldLabel>
                <FieldDescription>
                    Enable the chat option, to allow your audience to give comments during your live stream.
                </FieldDescription>
            </FieldContent>
            <Switch checked={chatEnable} onCheckedChange={handleChatEnable} id="switch-focus-mode" className="cursor-pointer" />
        </Field>
    )
}