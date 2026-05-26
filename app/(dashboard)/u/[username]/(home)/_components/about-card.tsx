"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditDailog } from "./edit-dialog";
import { FollowedByType, FollowersType } from "@/actions/followers";
import { UserFollowersClient } from "@/app/(browse)/[username]/_components/user-followers-client";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    bio: string;
    followersCount: number;
    viewerIdentity: string;
    followedByList?: FollowedByType[];
    followersOfFollowing?: FollowersType[];
}

export function AboutCard({
    hostName,
    hostIdentity,
    bio,
    viewerIdentity,
    followedByList,
    followersOfFollowing,
}: AboutCardProps) {
    const isHost = viewerIdentity === `host-${hostIdentity}`;

    return (
        <div className="px-5 pb-5">
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                        About {hostName}
                    </CardTitle>
                    {isHost && <EditDailog initialBio={bio} />}
                </CardHeader>
                <CardContent className="pt-0 -translate-y-5 flex flex-col">
                    <UserFollowersClient
                        followedByList={followedByList}
                        followersOfFollowing={followersOfFollowing}
                    />
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        {bio || "This user prefers to keep an air of mystery about them."}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}