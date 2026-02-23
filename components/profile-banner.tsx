import { UserAvatar } from "./ui/live-avatar";
import { CalendarDays } from "lucide-react";
import FollowButton from "./follow-button";
import { UserFollowers } from "./user-followers";
import Image from "next/image";
import { MoreOptions } from "./more-options";

interface ProfileBannerProps {
  isCurrentUserBlocked: boolean,
  currentUserFollowing: boolean;
  isCurrentUserBlockedSearchedUser: boolean,
  currentUser: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    username: string | null;
    displayUsername: string | null;
    phoneNumber: string | null;
    phoneNumberVerified: boolean | null;
    bio: string | null;
    bannerImage: string | null;
    dob: Date | null;
  } | null,

  searchedUser: {
      id: string;
      name: string;
      image: string | null;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      username: string | null;
      displayUsername: string | null;
      phoneNumber: string | null;
      phoneNumberVerified: boolean | null;
      bio: string | null;
      bannerImage: string | null;
      dob: Date | null;
  }
}

export async function ProfileBanner({
  isCurrentUserBlockedSearchedUser,
  isCurrentUserBlocked,
  searchedUser,
  currentUserFollowing,
  currentUser
}: ProfileBannerProps) {
  if (!searchedUser || isCurrentUserBlocked) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center text-muted-foreground">
        User profile not found.
      </div>
    );
  }

  const sameUser = searchedUser.id === currentUser?.id;

  const joinedDate = new Date(searchedUser.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  function print() {
    console.log(searchedUser);
  }

  print();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full relative">
        <div className="relative w-full h-[200px] md:h-[420px] overflow-hidden border-b border-border">
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
        <div className="px-6 md:px-8 pb-8 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 -mt-16 relative z-10 mb-4">
            <UserAvatar
              isLive={false}
              name={searchedUser.name}
              src={searchedUser.image ?? ""}
              className="size-32 rounded-full border-4 border-background bg-card shadow-lg"
              avatarFallbackClassname="text-4xl"
            />

            <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 pb-2">
              {!sameUser && (
                <FollowButton
                  searchedUser={searchedUser}
                  currentUserFollowing={currentUserFollowing}
                />
              )}

              <MoreOptions isCurrentUserBlockedSearchedUser={isCurrentUserBlockedSearchedUser} currentUser={currentUser} searchedUserId={searchedUser.id} />
            </div>
          </div>

          <div className="space-y-1 max-w-2xl">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {searchedUser.name}
              </h1>

              <div className="text-sm text-muted-foreground flex flex-wrap gap-3 items-center">
                <span>@{searchedUser.username || "user"}</span>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  <span>Joined {joinedDate}</span>
                </div>
              </div>
            </div>

            <UserFollowers id={searchedUser.id} />
          </div>
          {searchedUser.bio && (
            <div className="text-base mt-3 max-w-2xl text-foreground/90">
              {searchedUser.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
