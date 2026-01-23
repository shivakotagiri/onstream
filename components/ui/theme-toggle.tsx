"use client";

import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, [])

    if(!mounted) return null;

    const handleTheme = () => {
        setTheme(theme === "light" ? "dark": "light");
    }
    return (
        <Button 
            variant={"ghost"} 
            onClick={handleTheme}
            className={cn(className)}
        >
            {theme === "light" ? <Moon /> : <Sun />}
       </Button>
    )
}