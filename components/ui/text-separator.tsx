import { cn } from "@/lib/utils";
import { Separator } from "./separator";


export default function TextSeparator({ text, className }: { text: string, className?: string }) {
    return (
        <div className={cn(className, "flex justify-center w-full items-center gap-2")}>
            <Separator className="max-w-[45%] w-full" />
            <span className="text-muted-foreground max-w-[10%] w-full">{ text }</span>
            <Separator className="max-w-[45%] w-full" />
        </div>
    )
}