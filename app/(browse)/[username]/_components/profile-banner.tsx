import { UserAvatar } from "@/components/ui/live-avatar";
import { CalendarDays } from "lucide-react";
import FollowButton from "./follow-button";
import { UserFollowers } from "./user-followers";
import Image from "next/image";
import { MoreOptions } from "./more-options";
import { User } from "@/db/schema";

interface ProfileBannerProps {
  isCurrentUserBlocked: boolean,
  currentUserFollowing: boolean;
  isCurrentUserBlockedSearchedUser: boolean,
  currentUser: User | null
  searchedUser: User | null,
  isLive: boolean
}

export async function ProfileBanner({
  isCurrentUserBlockedSearchedUser,
  isCurrentUserBlocked,
  searchedUser,
  currentUserFollowing,
  currentUser,
  isLive
}: ProfileBannerProps) {
  if (!searchedUser || isCurrentUserBlocked) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-muted-foreground">
        User profile not found.
      </div>
    );
  }

  const sameUser = searchedUser.id === currentUser?.id;

  const joinedDate = new Date(searchedUser.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function print() {
    console.log(searchedUser);
  }

  print();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full relative">
        <div className="relative w-full h-[160px] sm:h-[200px] md:h-[420px] overflow-hidden border-b border-border">
          {searchedUser.bannerImage ? (
            <>
              <Image
                src={searchedUser.bannerImage}
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

        <div className="px-4 sm:px-6 md:px-8 pb-6 flex flex-col w-full">
          <div className="w-full flex justify-between items-end gap-3 -mt-12 sm:-mt-14 md:-mt-16 relative z-10 mb-3 md:mb-4">
            <UserAvatar
              isLive={isLive}
              name={searchedUser.name}
              src={searchedUser.image ?? ""}
              className="size-20 sm:size-24 md:size-32 rounded-full border-4 border-background bg-card shadow-lg shrink-0"
              avatarFallbackClassname="text-2xl sm:text-3xl md:text-4xl"
            />

            <div className="flex items-center gap-2 pb-1 sm:pb-2 shrink-0">
              {!sameUser && (
                <FollowButton
                  searchedUser={searchedUser}
                  currentUserFollowing={currentUserFollowing}
                />
              )}
              <MoreOptions
                isCurrentUserBlockedSearchedUser={isCurrentUserBlockedSearchedUser}
                currentUser={currentUser}
                searchedUserId={searchedUser.id}
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight">
                {searchedUser.name}
              </h1>
              <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 items-center">
                <span>@{searchedUser.username || "user"}</span>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 sm:size-4" />
                  <span>Joined {joinedDate}</span>
                </div>
              </div>
            </div>
            <UserFollowers id={searchedUser.id} />
          </div>

          {searchedUser.bio && (
            <div className="text-sm sm:text-base max-w-2xl text-foreground/90 mt-2">
              {searchedUser.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}