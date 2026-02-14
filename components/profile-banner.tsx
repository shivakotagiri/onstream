import { UserAvatar } from "./ui/live-avatar";
import { Button } from "./ui/button";
import { EllipsisVertical, CalendarDays } from "lucide-react";
import FollowButton from "./follow-button";
import { UserFollowers } from "./user-followers";
import { getSession } from "@/lib/get-session";

interface ProfileBannerProps {
  CurrentUserFollowing: boolean;
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
  } | undefined;
}

export async function ProfileBanner({ followingData, CurrentUserFollowing }: ProfileBannerProps) {
  if (!followingData) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-muted-foreground">
        User profile not found.
      </div>
    );
  }

  const session = await getSession();
  const sameUser = followingData.id === session?.user?.id;
  const joinedDate = new Date(followingData.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <div className="w-full h-48 md:h-88 bg-linear-to-tr from-zinc-800 to-zinc-900 border-b border-border relative overflow-hidden" />
        
        <div className="px-6 md:px-8 pb-8 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 -mt-16 mb-4">
            <UserAvatar
              isLive={false}
              name={followingData.name}
              src={followingData.image ?? ""}
              className="size-32 rounded-full border-4 border-background bg-card shadow-sm"
              avatarFallbackClassname="text-4xl"
            />
            
            <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 pb-2">
              {!sameUser && (
                <FollowButton 
                  followingData={followingData} 
                  CurrentUserFollowing={CurrentUserFollowing} 
                />
              )}
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full shadow-none border-input text-foreground hover:bg-secondary shrink-0"
              >
                <EllipsisVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {followingData.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                @{followingData.displayUsername || followingData.username || "user"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" />
                <span>Joined {joinedDate}</span>
              </div>
            </div>

            <UserFollowers id={followingData.id} />
          </div>
        </div>
      </div>
    </div>
  );
}