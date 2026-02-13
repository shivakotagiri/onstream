import { userFollowers } from "@/actions/followers";

export async function UserFollowers({ id }: { id: string }) {
    const followersOfFollowing = await userFollowers(id);
    return (
        <p className="text-md text-muted-foreground flex gap-1">
            <span>{followersOfFollowing.length}</span>
            <span>followers</span>
        </p>
    )
}