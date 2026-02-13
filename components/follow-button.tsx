"use client";

import { UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { followUser, unFollowUser } from "@/actions/followers";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
    CurrentUserFollowing: boolean,
    followingData: {
        image: string | null;
        id: string;
        name: string;
        username: string | null;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        displayUsername: string | null;
    }
}

export default function FollowButton({ followingData, CurrentUserFollowing }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState<boolean>(CurrentUserFollowing);
    const currentUser = useSession().data;
    const router = useRouter();
    const handleFollow = async () => {
        if(!currentUser || !currentUser.user) {
            toast.error("Please login first");
            return;
        }
        else if(isFollowing) {
            await unFollowUser(currentUser.user.id, followingData.id);
            setIsFollowing(false);
            router.refresh();
        }
        else {
            await followUser(currentUser.user.id, followingData.id);
            setIsFollowing(true);
            router.refresh();
        }
    }

    //TODO: when i got signout the state is not changing as it is showing "following" when i hard reload the page then the state changes 

    return (
        <Button 
            onClick={handleFollow}
            className="font-semibold px-5 cursor-pointer">
            { isFollowing ? <div>Following</div>: 
                <div className="flex gap-1">
                    <UserPlus />
                    Follow
                </div>
            }
        </Button>
    )
}