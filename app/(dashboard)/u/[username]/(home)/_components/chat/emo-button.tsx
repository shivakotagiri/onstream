"use client";

import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiftIcon, StickerIcon } from "lucide-react";
import { useState } from "react";
import { LoadStickers } from "./load-stickers";

export function EmoButton() {
    const [sticker, setSticker] = useState<string>("");
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant={"ghost"} 
                    size={"icon-sm"} 
                    className="size-9 shrink-0 cursor-pointer rounded-lg hover:bg-primary/10 hover:text-white disabled:opacity-30 transition-colors"
                >
                    <StickerIcon className="size-4 text-white/25" />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={20} className="w-sm p-0">
                <Tabs defaultValue="sticker">
                    <TabsList className="bg-transparent w-full justify-start rounded-none p-0 h-auto flex-wrap mb-2">
                        <TabsTrigger 
                            value="sticker" 
                            asChild 
                            className="px-6 py-2.5 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all border-none shadow-none focus-visible:ring-0! focus-visible:outline-none! focus-visible:border-transparent! focus:ring-0! focus:outline-none! focus:border-transparent! ring-0 rounded-full"
                        >
                            <StickerIcon className="size-4" />
                        </TabsTrigger>
                        <TabsTrigger 
                            value="gif" 
                            asChild 
                            className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all border-none shadow-none focus-visible:ring-0! focus-visible:outline-none! focus-visible:border-transparent! focus:ring-0! focus:outline-none! focus:border-transparent! ring-0"
                        >
                            <GiftIcon className="size-4" />
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="sticker" className="space-y-3 px-5">
                        <Search placeholder="Search stickers" value={sticker} setValue={setSticker} />
                        <LoadStickers />
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}