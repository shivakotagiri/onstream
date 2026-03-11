import { userFollowers, usersFollowed } from "@/actions/followers";
import { FollowerList } from "./follower-list";
import { FollowedList } from "./followed-list";

export async function UserFollowers({ id }: { id: string }) {

    const [followersOfFollowing, followedByList] = await Promise.all([
        userFollowers(id),
        usersFollowed(id)
    ]);
    
    return (
        <div className="flex items-center gap-4 -translate-y-1">
            <p className="text-sm flex gap-1.5 items-center hover:underline cursor-pointer">
                <span className="text-muted-foreground"><FollowerList followersOfFollowing={followersOfFollowing} /></span>
            </p>
            <p className="text-sm flex gap-1.5 items-center hover:underline cursor-pointer">
                <span className="text-muted-foreground"><FollowedList followedByList={followedByList} /></span>
            </p>
        </div>
    )
}