"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";
import { UserAvatar } from "./ui/live-avatar";

interface SearchProps {
  className?: string;
  data: {
    id: string;
    name: string;
    userId: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    user: User;
  }[];
}

export function Search({ className, data }: SearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [mouseActiveIndex, setMouseActiveIndex] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = value
    ? data
        .filter((item) => {
          const username = item.user.username || "";
          return username.toLowerCase().includes(value.toLowerCase());
        })
        .sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0))
    : [];

  const hasExtraOptions = value.trim().length > 0;
  const totalOptions = filtered.length + (hasExtraOptions ? 2 : 0);

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

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < filtered.length) {
      setDisplayValue(filtered[activeIndex].user.username);
    } else {
      setDisplayValue(null);
    }
  }, [activeIndex, filtered]);

  function handleSelect(selected: string | null) {
    if (!selected) return;
    setValue("");
    setOpen(false);
    setActiveIndex(-1);
    router.push(`/${selected}`);
  }

  function handleSearchSubmit() {
    if (!value.trim()) return;
    setOpen(false);
    setActiveIndex(-1);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function handleGoTo() {
    if (!value.trim()) return;
    setOpen(false);
    setActiveIndex(-1);
    router.push(`/${value}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (totalOptions === 0) return;
        setActiveIndex((i) => (i + 1) % totalOptions);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (totalOptions === 0) return;
        setActiveIndex((i) => (i <= 0 ? totalOptions - 1 : i - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          handleSelect(filtered[activeIndex].user.username);
        } else if (activeIndex === filtered.length && hasExtraOptions) {
          handleSearchSubmit();
        } else if (activeIndex === filtered.length + 1 && hasExtraOptions) {
          handleGoTo();
        } else if (hasExtraOptions) {
          handleSearchSubmit();
        }
        break;
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

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
        value={displayValue ?? value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          setDisplayValue(null);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls="search-autocomplete-list"
        aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
        className="h-10 rounded-full border-border/60 bg-background pl-10 pr-4 text-sm shadow-sm transition-all focus-visible:ring-0"
      />

      {open && (
        <ul
          id="search-autocomplete-list"
          role="listbox"
          onMouseLeave={() => setMouseActiveIndex(null)}
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-border/60 bg-popover p-3 shadow-md flex flex-col gap-1"
        >
          {filtered.map((suggestion, index) => (
            <li
              key={suggestion.userId}
              id={`search-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(suggestion.user?.username);
              }}
              onMouseEnter={() => setMouseActiveIndex(index)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground",
                (index === activeIndex || index === mouseActiveIndex) &&
                  "bg-secondary text-accent-foreground",
              )}
            >
              <div className="flex items-center justify-between w-full h-fit">
                <div className="flex gap-2 items-center justify-center">
                  <UserAvatar
                    badge={false}
                    className="size-5"
                    src={suggestion.user.image || ""}
                    name={suggestion.user.name}
                    isLive={suggestion.isLive}
                  />
                  <div className="flex flex-col">
                    <span className="truncate text-xs font-semibold">
                      {suggestion.user?.username}
                    </span>
                    <span className="truncate text-xs">
                      {suggestion.isLive ? suggestion.name : "Channel"}
                    </span>
                  </div>
                </div>
                {suggestion.isLive && (
                  <span className="text-xs text-white bg-red-600 px-3 py-0.5 rounded-xl">
                    Live
                  </span>
                )}
              </div>
            </li>
          ))}

          {hasExtraOptions && (
            <>
              <li
                id={`search-option-${filtered.length}`}
                role="option"
                aria-selected={activeIndex === filtered.length}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSearchSubmit();
                }}
                onMouseEnter={() => setMouseActiveIndex(filtered.length)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground",
                  (activeIndex === filtered.length ||
                    mouseActiveIndex === filtered.length) &&
                    "bg-secondary text-accent-foreground",
                )}
              >
                <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{value}</span>
              </li>
              <li
                id={`search-option-${filtered.length + 1}`}
                role="option"
                aria-selected={activeIndex === filtered.length + 1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleGoTo();
                }}
                onMouseEnter={() => setMouseActiveIndex(filtered.length + 1)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground",
                  (activeIndex === filtered.length + 1 ||
                    mouseActiveIndex === filtered.length + 1) &&
                    "bg-secondary text-accent-foreground",
                )}
              >
                <span className="truncate">Go to {value}</span>
              </li>
            </>
          )}

          {!hasExtraOptions && (
            <li className="flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground h-32">
              Start typing to search
            </li>
          )}
        </ul>
      )}
    </div>
  );
}