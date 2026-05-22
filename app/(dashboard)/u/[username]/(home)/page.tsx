import { getUserByUsername } from "@/actions/user";
import { getInfo } from "@/lib/get-session"
import { StreamPlayer } from "./_components/stream-player";

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
    return (
        <div className="w-screen pt-18 sm:pt-13 flex sm:flex-row flex-col">
            <StreamPlayer user={user} stream={stream} isFollowing={true} followersCount={followersCount} />
        </div>
    )
}