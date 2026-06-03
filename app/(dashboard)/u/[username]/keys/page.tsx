import { getStreamByUserId } from "@/actions/stream"
import { ServerUrl } from "./_components/server-url"
import { StreamKey } from "./_components/stream-key"
import { redirect } from "next/navigation"
import GenerateConnection from "./_components/generate-connection"
import { getCurrentUser } from "@/actions/user"

export default async function KeysPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect("/")

  const stream = await getStreamByUserId(currentUser.id)
  if (!stream) throw new Error("Stream not found")

  return (
    <div className="md:p-10 p-5 h-screen w-screen md:pt-23 pt-18 flex flex-col gap-10">
      <div className="w-full flex justify-between items-center">
        <span className="sm:text-3xl text-xl font-semibold">Keys & URLS</span>
        <GenerateConnection />
      </div>
      <div className="space-y-5">
        <ServerUrl serverUrl={stream.serverUrl} />
        <StreamKey streamKey={stream.streamKey} />
      </div>
    </div>
  )
}
