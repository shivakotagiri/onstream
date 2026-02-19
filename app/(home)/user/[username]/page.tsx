import { isUserBlocked } from "@/actions/block-users-service";
import { isCurrentUserFollowing } from "@/actions/followers";
import { currentUserData, userSearchData } from "@/lib/user-data";
import { ProfileBanner } from "@/components/profile-banner";

export default async function UserDashboardPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  const [ searchedUser, currentUser ] = await Promise.all([
    userSearchData(username),
    currentUserData()
  ])

  const[currentUserFollowing, isCurrentUserBlocked, isCurrentUserBlockedSearchedUser] = 
    await Promise.all([
      isCurrentUserFollowing(currentUser?.id || "", searchedUser?.id || ""),
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