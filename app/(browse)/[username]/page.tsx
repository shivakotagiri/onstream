import { blockedByUser } from "@/actions/block-service";
import { isCurrentUserFollowing, userFollowers, usersFollowed } from "@/actions/followers";
import { getUserByUsername } from "@/actions/user";
import { StreamPlayer } from "@/app/(dashboard)/u/[username]/(home)/_components/stream-player";

export default async function ProfilePage({ params }: { params: { username: string }; }) {
  const { username } = await params;

  const searchedUser = await getUserByUsername(username);

  if(!searchedUser || !searchedUser.user) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Page not found
      </div>
    )
  }

  const[isFollowing, isBlocked] = 
    await Promise.all([
      isCurrentUserFollowing(searchedUser.user.id),
      blockedByUser(searchedUser.user.id),
  ]);

  if(isBlocked) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Page not found
      </div>
    )
  };

  const [followersOfFollowing, followedByList] = await Promise.all([
      userFollowers(searchedUser.user.id),
      usersFollowed(searchedUser.user.id)
  ]);
  
  return (
    <div className="w-full min-h-screen bg-background pt-13">
      <div className="w-full mx-auto">
        <StreamPlayer 
          isFollowing={isFollowing} 
          followersCount={searchedUser.followersCount} 
          user={searchedUser.user}  
          stream={searchedUser.stream}
          followersOfFollowing={followersOfFollowing}
          followedByList={followedByList}
        />
      </div>
    </div>
  );
}