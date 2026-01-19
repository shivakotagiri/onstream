'use client';

import { Toaster } from "sonner";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

interface ThemeWrapperProps {
    children: React.ReactNode
}

export default function Provider({
    children
}: ThemeWrapperProps) {
    return (
        <div className="h-full w-full">
            <AnimatedThemeToggler className="fixed top-5 right-5 cursor-pointer" />
            { children }
            <Toaster closeButton />
        </div>
    )
}