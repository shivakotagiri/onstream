import { getCurrentUser, getUserByUsername } from "@/actions/user"
import { StreamPlayer } from "./_components/stream-player"
import { userFollowers, usersFollowed } from "@/actions/followers"

export default async function CreaterPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return <div>No User</div>

  const username = (await params).username

  const info = await getUserByUsername(username)
  if (!info) throw new Error("User not found")

  const { user, stream, followersCount } = info

  if (!user || user.id !== currentUser.id || !stream) {
    throw new Error("Unauthorized")
  }

  const [followersOfFollowing, followedByList] = await Promise.all([
    userFollowers(user.id),
    usersFollowed(user.id),
  ])

  return (
    <div className="w-full pt-14">
      <StreamPlayer
        user={user}
        stream={stream}
        isFollowing={true}
        followersCount={followersCount}
        followersOfFollowing={followersOfFollowing}
        followedByList={followedByList}
      />
    </div>
  )
}
