"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditDailog } from "./edit-dialog";
import { FollowedByType, FollowersType } from "@/actions/followers";
import { UserFollowersClient } from "@/app/(browse)/[username]/_components/user-followers-client";

interface AboutCardProps {
    hostName: string,
    hostIdentity: string,
    bio: string,
    followersCount: number,
    viewerIdentity: string,
    followedByList?: FollowedByType[],
    followersOfFollowing?: FollowersType[],
}

export function AboutCard({ 
    hostName, 
    hostIdentity, 
    bio,  
    viewerIdentity,
    followedByList,
    followersOfFollowing
}: AboutCardProps) {

    const isHost = viewerIdentity === `host-${hostIdentity}`;

    return (
        <div className="px-5">
            <Card className="flex flex-col gap-1">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>
                        About { hostName }
                    </CardTitle>
                    { isHost && <EditDailog initialBio={bio} />}
                </CardHeader>
                <CardContent className="space-y-0">
                    <UserFollowersClient 
                        followedByList={followedByList} 
                        followersOfFollowing={followersOfFollowing} 
                    />
                    <div>
                        { bio || "This user prefers to keep an air of mistery about them."}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}