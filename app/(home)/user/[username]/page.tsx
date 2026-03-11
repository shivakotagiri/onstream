import { isUserBlocked } from "@/actions/block-service";
import { isCurrentUserFollowing } from "@/actions/followers";
import { getCurrentUser, searchUserByUsername } from "@/actions/user";
import { ProfileBanner } from "@/components/profile-banner";

export default async function ProfilePage({ params }: { params: { username: string }; }) {
  const { username } = await params;

  const [currentUser, searchedUser] = await Promise.all([getCurrentUser(), searchUserByUsername(username)])

  if(!searchedUser) return <div>User not found</div>

  const[currentUserFollowing, isCurrentUserBlocked, isCurrentUserBlockedSearchedUser] = 
    await Promise.all([
      isCurrentUserFollowing(searchedUser?.id || ""),
      isUserBlocked(searchedUser?.id || "", currentUser?.id || ""),
      isUserBlocked(currentUser?.id || "", searchedUser?.id || "")
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
        />
      </div>
    </div>
  );
}