import { isCurrentUserFollowing } from "@/actions/followers";
import { userSearchData } from "@/actions/user-data";
import { ProfileBanner } from "@/components/profile-banner";
import { getSession } from "@/lib/get-session";

export default async function UserDashboardPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const followingData = await userSearchData(username);
  const session = await getSession();
  const CurrentUserFollowing = await isCurrentUserFollowing(session?.user.id || "", followingData?.id || "")
  return (
    <div className="w-screen h-full flex flex-col items-center">
      <div className="w-full h-full flex justify-center">
        <ProfileBanner followingData={followingData} CurrentUserFollowing={CurrentUserFollowing} />
      </div>
    </div>
  );
}
