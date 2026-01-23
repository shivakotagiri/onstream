"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeToggle from "./ui/theme-toggle";

export default function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>
        <div className="flex">
            { children }
            <ThemeToggle className="cursor-pointer fixed right-2 top-2" />
        </div>
    </NextThemesProvider>
}