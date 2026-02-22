/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { UserPlus, UserCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { followUser, unFollowUser } from "@/actions/followers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
    currentUserFollowing: boolean;
    searchedUser: {
        id: string;
        name: string;
        username: string | null;
        displayUsername: string | null;
    }
}

export default function FollowButton({ searchedUser, currentUserFollowing }: FollowButtonProps) {
    const currentUser = useSession().data;
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState<boolean>(currentUserFollowing);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!currentUser?.user) {
            setIsFollowing(false);
        } else {
            setIsFollowing(currentUserFollowing);
        }
    }, [currentUser?.user, currentUserFollowing]);

    const handleFollow = async () => {
        if (!currentUser || !currentUser.user) {
            toast.error("Please login first to follow users.");
            return;
        }

        setIsLoading(true);
        try {
            if (isFollowing) {
                await unFollowUser(searchedUser.id);
                setIsFollowing(false);
                toast.success(`Unfollowed ${searchedUser.name}`);
            } else {
                await followUser(searchedUser.id);
                setIsFollowing(true);
                toast.success(`Following ${searchedUser.name}`);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            setIsFollowing(currentUserFollowing); 
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button 
            onClick={handleFollow}
            disabled={isLoading}
            variant={isFollowing ? "outline" : "default"}
            className={cn(
                "font-semibold px-6 rounded-full shadow-none transition-all duration-200",
                isFollowing ? "hover:border-destructive hover:text-destructive hover:bg-destructive/10" : ""
            )}
        >
            {isFollowing ? (
                <div className="flex items-center gap-1.5">
                    <UserCheck className="size-4" />
                    <span>Following</span>
                </div>
            ) : (
                <div className="flex items-center gap-1.5">
                    <UserPlus className="size-4" />
                    <span>Follow</span>
                </div>
            )}
        </Button>
    )
}