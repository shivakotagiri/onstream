import { isUserBlocked } from "@/actions/block-users-service";
import { isCurrentUserFollowing } from "@/actions/followers";
import { currentUserData, userSearchData } from "@/actions/user";
import { ProfileBanner } from "@/components/profile-banner";

export default async function UserDashboardPage({ params }: { params: { username: string }; }) {
  const { username } = await params;

  const searchedUserPromise = userSearchData(username);
  const currentUserDataPromise = currentUserData();

  const searchedUser = await searchedUserPromise;
  const currentUser = await currentUserDataPromise;

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