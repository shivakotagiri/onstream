"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Input 
                type="text"
                className="h-full rounded-r-none w-full max-w-[75%] border border-secondary border-r-0 bg-neutral-100 lg:text-base"
                placeholder="search..."
            />
            <Button 
                type="button" 
                className="border border-secondary h-full hover:text-foreground hover:bg-none rounded-none rounded-r-2xl border-l-0 cursor-pointer bg-neutral-100 dark:bg-[#222326]" 
                variant={"ghost"}
            >
                <SearchIcon />
            </Button>
        </div>
    )
}