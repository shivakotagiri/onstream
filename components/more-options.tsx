"use client";

import { EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {useState } from "react";
import { blockUser, unBlockUser } from "@/actions/block-users-service";
import { toast } from "sonner";
import { currentUserType } from "@/actions/user";

interface MoreOptionsProps {
    isCurrentUserBlockedSearchedUser: boolean,
    searchedUserId: string,
    currentUser: currentUserType | null
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