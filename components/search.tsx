"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SearchProps {
  className?: string;
  suggestions?: string[];
}

export function Search({
  className,
  suggestions = ["heloo", "hive", "hence", "shiva", "hen", 'hoooo'],
}: SearchProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");

  const filtered = value
    ? suggestions.filter(
        (s) =>
          s.toLowerCase().includes(value.toLowerCase()) 
      )
    : [];

  const showDropdown = open;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [value]);

  function handleSelect(selected: string) {
    setValue(selected);
    router.push(`/${selected}`);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(filtered[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  }
  const router = useRouter();

  return (
    <div ref={containerRef} className="relative w-full">
      <SearchIcon
        className={cn(
          "absolute left-3 size-4 -translate-y-1/2 top-1/2 text-muted-foreground",
          className,
        )}
      />
      <Input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        autoComplete="off"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="search-autocomplete-list"
        aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
        className="h-10 rounded-full border-border/60 bg-background pl-10 pr-4 text-sm shadow-sm transition-all focus-visible:ring-0"
      />

      {showDropdown && (
        <ul
          id="search-autocomplete-list"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-border/60 bg-popover p-1 shadow-md"
        >
          {filtered.length > 0 ? filtered.map((suggestion, index) => (
            <li
              key={suggestion}
              id={`search-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(suggestion);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground",
                index === activeIndex && "bg-secondary text-accent-foreground",
              )}
            >
              <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate">{suggestion}</span>
            </li>
          )): <li className="flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground h-32">
            No results found
          </li>}
        </ul>
      )}
    </div>
  );
}