import { isUserBlocked } from "@/actions/block-service";
import { isCurrentUserFollowing } from "@/actions/followers";
import { getUserByUsername } from "@/actions/user";
import { ProfileBanner } from "./_components/profile-banner";
import { getInfo } from "@/lib/get-session";

export default async function ProfilePage({ params }: { params: { username: string }; }) {
  const { username } = await params;

  const [data, searchedUser] = await Promise.all([getInfo(), getUserByUsername(username)]);

  const currentUser = data?.currentUser || null;

  if(!searchedUser) return <div>User not found</div>

  const[currentUserFollowing, isCurrentUserBlocked, isCurrentUserBlockedSearchedUser] = 
    await Promise.all([
      isCurrentUserFollowing(searchedUser?.id || ""),
      isUserBlocked(searchedUser?.id || "", currentUser?.id || ""),
      isUserBlocked(currentUser?.id || "", searchedUser?.id || ""),
    ]);
  return (
    <div className="w-full min-h-screen bg-background pb-20">
      <div className="w-full mx-auto">
        <ProfileBanner 
          currentUser={currentUser}
          searchedUser={searchedUser} 
          currentUserFollowing={currentUserFollowing} 
          isCurrentUserBlocked={isCurrentUserBlocked}
          isCurrentUserBlockedSearchedUser={isCurrentUserBlockedSearchedUser}
          isLive={searchedUser.stream?.isLive || false}
        />
      </div>
    </div>
  );
}