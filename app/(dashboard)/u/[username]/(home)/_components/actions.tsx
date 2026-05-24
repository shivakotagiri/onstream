"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { followUser, unFollowUser } from "@/actions/followers";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
    isHost: boolean,
    hostIdentity: string,
    isFollowing: boolean
}

export function Actions({
    isHost,
    hostIdentity,
    isFollowing
}: ActionsProps) {
    const session = useSession().data;
    const router = useRouter();
    const [ isPending, startTransition ] = useTransition();

    function handleFollow() {
        startTransition(() => {
            followUser(hostIdentity)
                .then(() => toast.success(`following`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    function handleUnFollow() {
        startTransition(() => {
            unFollowUser(hostIdentity)
                .then(() => toast.success(`unfollowed`))
                .catch(() => toast.error("Something went wrong"))
        });
    }

    function toggleFollow() {
        if(!session || !session.session.userId) return router.push("/auth/login");
        if(isHost) return;

        if(isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }
    return (
        <div>
            <Button 
                variant={"default"}
                className="md:w-auto w-full"
                onClick={toggleFollow}
                disabled={isPending || isHost}
            >
                <div className="flex items-center justify-center gap-1.5">
                    <Heart className={cn("fill-none w-4 h-4", isFollowing && "fill-white")}/>
                    <span className="">{isFollowing ? "Unfollow": "Follow"}</span>
                </div>
            </Button>
        </div>
    )
}

export function ActionsSkeleton() {
    return (
        <Skeleton className="w-40 h-12.5 rounded-2xl" />
    )
}