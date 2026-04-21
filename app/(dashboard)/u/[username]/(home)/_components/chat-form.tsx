"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent } from "react";

interface ChatFormProps {
    onSubmit: () => void;
    value: string, 
    onChange: (value: string) => void,
}

export function ChatForm({ onSubmit, value, onChange }: ChatFormProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 py-5 px-3  border-t">
            <Input value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />
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