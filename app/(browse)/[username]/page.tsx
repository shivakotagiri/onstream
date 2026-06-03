import { blockedByUser } from "@/actions/block-service"
import { isCurrentUserFollowing, userFollowers, usersFollowed } from "@/actions/followers"
import { getUserByUsername } from "@/actions/user"
import { StreamPlayer } from "@/app/(dashboard)/u/[username]/(home)/_components/stream-player"
import { notFound } from "next/navigation"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const searchedUser = await getUserByUsername(username)

  if (!searchedUser || !searchedUser.user) {
    notFound()
  }

  const [isFollowing, isBlocked] = await Promise.all([
    isCurrentUserFollowing(searchedUser.user.id),
    blockedByUser(searchedUser.user.id),
  ])

  if (isBlocked) {
    notFound()
  }

  const [followersOfFollowing, followedByList] = await Promise.all([
    userFollowers(searchedUser.user.id),
    usersFollowed(searchedUser.user.id),
  ])

  return (
    <div className="w-full min-h-screen bg-background pt-13">
      <div className="w-full mx-auto">
        <StreamPlayer
          isFollowing={isFollowing}
          followersCount={searchedUser.followersCount}
          user={searchedUser.user}
          stream={searchedUser.stream}
          followersOfFollowing={followersOfFollowing}
          followedByList={followedByList}
        />
      </div>
    </div>
  )
}
