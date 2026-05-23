import { getUserByUsername } from "@/actions/user";
import { getInfo } from "@/lib/get-session"
import { StreamPlayer } from "./_components/stream-player";
import { userFollowers, usersFollowed } from "@/actions/followers";

interface CreaterPageProps {
    params: Promise<{
        username: string
    }>
}

export default async function CreaterPage({ params }: CreaterPageProps) {
    const data = await getInfo();
    if(!data) return <div>No User</div>;

    const username = (await params).username;
    console.log(username);

    const currentUser = data.currentUser;
    const info = await getUserByUsername(username);
    const{ user, stream, followersCount } = info;

    if(!user || user.id !== currentUser.id || !stream) {
        throw new Error("Unauthorized");
    }

    const [followersOfFollowing, followedByList] = await Promise.all([
        userFollowers(user.id),
        usersFollowed(user.id)
    ]);
    return (
        <div className="w-screen pt-18 sm:pt-13 flex sm:flex-row flex-col">
            <StreamPlayer 
                user={user} 
                stream={stream} 
                isFollowing={true} 
                followersCount={followersCount} 
                followersOfFollowing={followersOfFollowing}
                followedByList={followedByList}
            />
        </div>
    )
}