import { userFollowers, usersFollowed } from "@/actions/followers";
import { UserFollowersClient } from "./user-followers-client";

export async function UserFollowers({ id }: { id: string }) {

    const [followersOfFollowing, followedByList] = await Promise.all([
        userFollowers(id),
        usersFollowed(id)
    ]);
    
    return (
        <UserFollowersClient followedByList={followedByList} followersOfFollowing={followersOfFollowing} />
    )
}