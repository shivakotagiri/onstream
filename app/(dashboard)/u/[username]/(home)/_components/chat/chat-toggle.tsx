import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useChatSidebarStore } from "@/store/use-chatbar";
import { ArrowLeftFromLine, ArrowRightFromLine, LucideIcon } from "lucide-react";

export function ChatToggle() {
    const { collapsed, onExpand, onCollapse } = useChatSidebarStore();
    const label = collapsed ? "Expand": "Collapse";
    function onToggle() {
        if(collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    }

    const Icon: LucideIcon = collapsed ? ArrowLeftFromLine: ArrowRightFromLine;
    return (
        <Tooltip>
            <TooltipTrigger className="w-full h-full" asChild>
                <Button onClick={onToggle} variant={"ghost"} size={"icon"} className="text-muted-foreground p-3 cursor-pointer transition-all duration-300 w-8 h-8">
                    <Icon className="w-5 h-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
                { label }
            </TooltipContent>
        </Tooltip>
    )
}