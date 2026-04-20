import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChatVariant, useChatSidebarStore } from "@/store/use-chatbar";
import { LucideIcon, MessageSquare, Users } from "lucide-react";

export function CommunityToggle() {
    const { variant, onChangeVariant } = useChatSidebarStore();
    const isChat = variant === ChatVariant.CHAT;
    const label = isChat ? "Community": "Go back to chat";
    const Icon: LucideIcon = isChat ? Users: MessageSquare;

    function handleToggle() {
        const newVariant = isChat ? ChatVariant.COMMUNITY: ChatVariant.CHAT;
        onChangeVariant(newVariant);
    }
    return (
        <Tooltip>
            <TooltipTrigger className="w-full h-full" asChild>
                <Button onClick={handleToggle} variant={"ghost"} size={"icon"} className="text-muted-foreground p-3 cursor-pointer transition-all duration-300 w-8 h-8">
                    <Icon className="w-5 h-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
                { label }
            </TooltipContent>
        </Tooltip>
    )
}