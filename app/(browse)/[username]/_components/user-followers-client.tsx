"use client";

import { FollowedList } from "@/components/followed-list";
import { FollowerList } from "./follower-list";
import { FollowedByType, FollowersType } from "@/actions/followers";

interface UserFollowersClientProps {
    followersOfFollowing: FollowersType[],
    followedByList: FollowedByType[]
}

export function UserFollowersClient({ followersOfFollowing, followedByList }: UserFollowersClientProps) {
    return (
        <div className="flex items-center gap-4 -translate-y-1">
            <p className="text-sm flex gap-1.5 items-center hover:underline cursor-pointer">
                <span className="text-muted-foreground">
                    <FollowerList followersOfFollowing={followersOfFollowing} />
                </span>
            </p>
            <p className="text-sm flex gap-1.5 items-center hover:underline cursor-pointer">
                <span className="text-muted-foreground">
                    <FollowedList followedByList={followedByList} />
                </span>
            </p>
        </div>
    )
}