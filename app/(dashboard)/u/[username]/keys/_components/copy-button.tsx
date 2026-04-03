"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, CopyIcon, LucideIcon } from "lucide-react";
import { useState } from "react"

export function CopyButton({ value }: { value: string }) {
    const [copy, setCopy] = useState<boolean>(false);
    const Icon:LucideIcon = copy ? CheckCheck : CopyIcon

    async function handleCopy() {
        setCopy(prev => !prev);
        await navigator.clipboard.writeText(value);
        setTimeout(() => setCopy(prev => !prev), 500);
    }
    return (
        <div className="w-fit">
            <Button onClick={handleCopy} variant={"ghost"} size={"icon"} className="cursor-pointer">
                <Icon />
            </Button>
        </div>
    )
}