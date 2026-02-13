import { userFollowers } from "@/actions/followers";
import { LiveAvatar } from "./ui/live-avatar";
import { userSearchData } from "@/actions/user-data";
import { Button } from "./ui/button";
import { EllipsisVertical, UserPlus } from "lucide-react";

interface ProfileBannerProps {
  username: string;
}

export async function ProfileBanner({ username }: ProfileBannerProps) {
  const data = await userSearchData(username);
  
  if (!data) {
    return (
      <div className="w-full h-[480px] flex justify-center items-center">
        User not found
      </div>
    );
  }
  const followersData = await userFollowers(data.id);

  return (
    <div className="w-full h-full flex flex-col gap-15 ">
      <div className="w-full relative h-[480px] bg-blue-400 flex justify-center items-center ">
        <div className="absolute -bottom-10 left-10 ">
          <LiveAvatar
            isLive={true}
            name={data.name}
            src={data.image ?? ""}
            className="size-25 ring-3 ring-red-500"
            avatarFallbackClassname="text-3xl dark:text-white"
            badgeClassname="text-sm px-3"
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-3 md:px-10">
        <div className="h-fit">
          <div className="lg:text-3xl text-xl">
            {data.name}
          </div>
          <p className="text-md text-muted-foreground flex gap-1">
            <span>{followersData.length}</span>
            <span>followers</span>
          </p>
        </div>
        <div className="flex gap-1">
          <Button className="font-semibold px-5 cursor-pointer"><UserPlus />Follow</Button>
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
