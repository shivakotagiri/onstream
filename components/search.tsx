"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface SearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  className?: string;
}

export function Search({ placeholder, value, setValue, className }: SearchProps) {
  return (
    <div className="relative w-full">
      <SearchIcon className={cn("absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground", className)} />
      <Input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-8 rounded-full border-border/60 bg-background pl-10 pr-4 text-sm shadow-sm transition-all focus-visible:ring-0"
      />
    </div>
  );
}