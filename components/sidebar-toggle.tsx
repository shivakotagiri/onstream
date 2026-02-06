import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export function SidebarToggle({ className }: {
    className: string
}) {
    return (
        <SidebarProvider>
            <SidebarTrigger className={cn(className)} />
        </SidebarProvider>
    )
}