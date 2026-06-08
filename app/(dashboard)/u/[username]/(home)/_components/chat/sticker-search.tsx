"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";
import { DebouncedState } from "usehooks-ts";

interface StickerSearchProps {
    setDebouncedValue: DebouncedState<(value: string) => void>
}

export default function StickerSearch({ setDebouncedValue }: StickerSearchProps) {
    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDebouncedValue(e.target.value)}
                placeholder="Search stickers"
                className="h-8 rounded-full border-border/60 bg-background pl-10 pr-4 text-sm shadow-sm transition-all focus-visible:ring-0"
            />
        </div>
    )
}