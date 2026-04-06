"use client";

import { Field, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function StreamKey({ streamKey }: { streamKey: string }) {
    const [hide, setHide] = useState<boolean>(true);
    function handleHide() {
        setHide(prev => !prev);
    }
    return (
        <Field className="w-full flex flex-col border border-neutral-500 dark:border-neutral-800 rounded-sm p-5">
            <FieldContent className="w-full flex flex-row justify-center items-center md:gap-10">
                <div className="w-fit text-nowrap sm:text-base text-sm mr-2 md:mr-0">Stream Key</div>
                <Input value={streamKey} readOnly type={hide ? "password": "text"} placeholder="Stream Key" className="w-full" />
                <CopyButton value={streamKey} />
            </FieldContent>
            <Button 
                onClick={handleHide} 
                className="max-w-xs text-base tracking-wide dark:text-white text-black cursor-pointer sm:justify-start justify-end underline underline-offset-5 md:no-underline" 
                variant={"link"}
            >
                {hide ? "Show": "Hide"}
            </Button>
        </Field>
    )
}