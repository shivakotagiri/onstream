"use client";

import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {useState } from "react";
import { blockUser, unBlockUser } from "@/actions/block-service";
import { toast } from "sonner";
import { User } from "@/db/schema";

interface MoreOptionsProps {
    isCurrentUserBlockedSearchedUser: boolean,
    searchedUserId: string,
    currentUser: User | null
}

export function MoreOptions({ searchedUserId, currentUser, isCurrentUserBlockedSearchedUser }: MoreOptionsProps) {
    const [block, setBlock] = useState<boolean>(isCurrentUserBlockedSearchedUser);

    async function handleBlock() {
        const res = await blockUser(searchedUserId);
        if(res.status) {
            toast.success(res.message);
            setBlock(true);
        } else {
            toast.error(res.message);
        }
    }

    async function handleUnBlock() {
        const res = await unBlockUser(currentUser?.id || "", searchedUserId || "");
        if(res.status) {
            toast.success(res.message);
            setBlock(false);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full shadow-none border-input text-foreground hover:bg-transparent shrink-0"
                >
                    <EllipsisVertical className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex justify-center items-center mt-1" align="end">
                { searchedUserId !== currentUser?.id && <DropdownMenuItem onClick={!block ? handleBlock: handleUnBlock} className="text-center hover:bg-transparent">
                    {block ? "Unblock User": "Block User"}
                </DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}