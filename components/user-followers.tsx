import { userFollowers } from "@/actions/followers";

export async function UserFollowers({ id }: { id: string }) {
    const followersOfFollowing = await userFollowers(id);
    
    return (
        <div className="flex items-center gap-4">
            <p className="text-sm flex gap-1.5 items-center hover:underline cursor-pointer">
                <span className="font-semibold text-foreground">{followersOfFollowing.length}</span>
                <span className="text-muted-foreground">Followers</span>
            </p>
            <p className="text-sm flex gap-1.5 items-center hover:underline cursor-pointer">
                <span className="font-semibold text-foreground">0</span>
                <span className="text-muted-foreground">Following</span>
            </p>
        </div>
    )
}