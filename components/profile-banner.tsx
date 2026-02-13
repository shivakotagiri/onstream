import { LiveAvatar } from "./ui/live-avatar";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import FollowButton from "./follow-button";
import { UserFollowers } from "./user-followers";

interface ProfileBannerProps {
  CurrentUserFollowing: boolean,
  followingData: {
    username: string | null;
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    displayUsername: string | null;
  } | undefined
}

export async function ProfileBanner({ followingData, CurrentUserFollowing }: ProfileBannerProps) {
  if (!followingData) {
    return (
      <div className="w-full h-[480px] flex justify-center items-center">
        User not found
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-15 ">
      <div className="w-full relative h-[480px] bg-blue-400 flex justify-center items-center ">
        <div className="absolute -bottom-10 left-10 ">
          <LiveAvatar
            isLive={true}
            name={followingData.name}
            src={followingData.image ?? ""}
            className="size-25 ring-3 ring-red-500"
            avatarFallbackClassname="text-3xl dark:text-white"
            badgeClassname="text-sm px-3"
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-3 md:px-10">
        <div className="h-fit">
          <div className="lg:text-3xl text-xl">
            {followingData.name}
          </div>
          <UserFollowers id={followingData.id} />
        </div>
        <div className="flex gap-1">
          <FollowButton followingData={followingData} CurrentUserFollowing={CurrentUserFollowing} />
          <Button 
            variant={"ghost"} 
            size={"icon"}
            className="cursor-pointer hover:bg-secondary"
          >
            <EllipsisVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
