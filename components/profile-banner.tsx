import { UserAvatar } from "./ui/live-avatar";
import { Button } from "./ui/button";
import { EllipsisVertical, CalendarDays } from "lucide-react";
import FollowButton from "./follow-button";
import { UserFollowers } from "./user-followers";
import { getSession } from "@/lib/get-session";
import Image from "next/image";

interface ProfileBannerProps {
  CurrentUserFollowing: boolean;
  followingData: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image: string | null;
    username: string | null;
    displayUsername: string | null;
    bannerImage: string | null;
    bio: string | null;
    dob: string | null;
  } | undefined;
}

export async function ProfileBanner({
  followingData,
  CurrentUserFollowing,
}: ProfileBannerProps) {
  if (!followingData) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-muted-foreground">
        User profile not found.
      </div>
    );
  }

  const session = await getSession();
  const sameUser = followingData.id === session?.user?.id;

  const joinedDate = new Date(followingData.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full relative">
        <div className="relative w-full h-[200px] md:h-[420px] overflow-hidden border-b border-border">
          {followingData.bannerImage ? (
            <>
              <Image
                src={followingData.bannerImage}
                alt="Banner"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </>
          ) : (
            <div className="w-full h-full bg-linear-to-tr from-zinc-800 to-zinc-900" />
          )}
        </div>
        <div className="px-6 md:px-8 pb-8 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 -mt-16 relative z-10 mb-4">
            <UserAvatar
              isLive={false}
              name={followingData.name}
              src={followingData.image ?? ""}
              className="size-32 rounded-full border-4 border-background bg-card shadow-lg"
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

          <div className="space-y-1 max-w-2xl">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {followingData.name}
              </h1>

              <div className="text-sm text-muted-foreground flex flex-wrap gap-3 items-center">
                <span>@{followingData.username || "user"}</span>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  <span>Joined {joinedDate}</span>
                </div>
              </div>
            </div>

            <UserFollowers id={followingData.id} />
          </div>
          {followingData.bio && (
            <div className="text-base mt-3 max-w-2xl text-foreground/90">
              {followingData.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
