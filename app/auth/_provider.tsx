"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return <div className="w-full h-full">
        <Button 
            type="button"
            variant={"ghost"}
            onClick={() => router.push("/")} 
            className="cursor-pointer fixed top-2 left-2 text-muted-foreground flex justify-center items-center gap-0.5"
        >
            <ArrowLeft size={15} />
            <span>back</span>
        </Button>
        { children }
    </div>
}