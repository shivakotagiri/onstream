import { getStreams } from "@/actions/stream";
import { UserAvatar } from "@/components/ui/live-avatar";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const streams = await getStreams();
  return (
    <div className="min-h-screen w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mt-15 gap-3 p-10">
      {streams.map((stream, idx) => (
        <Link href={`/${stream.user.username}`} key={idx}className="w-full aspect-video">
          <div className="w-full relative aspect-video rounded-lg overflow-hidden dark:bg-secondary/50 bg-secondary/60">
            {stream.thumbnailUrl ? (
              <div className="w-full h-full relative">
                <Image 
                  alt="Thumbnail" 
                  fill 
                  src={stream.thumbnailUrl}
                  className="object-cover object-center absolute inset-0" 
                />
                <div className="text-white bg-red-600 absolute top-5 left-5 text-sm px-3 rounded-md">
                  Live
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <UserAvatar 
                  name={stream.user.name} 
                  src={stream.user.image || ""} 
                  isLive={stream.isLive}
                  className="w-16 h-16"
                  avatarFallbackClassname="text-2xl bg-neutral-200 dark:bg-secondary"
                />
              </div>
            )}
            </div>
            <div className="flex gap-3 mt-3">
              <UserAvatar 
                name={stream.user.name} 
                src={stream.user.image || ""} 
                isLive={stream.isLive}
                className="size-8"
              />
              <div className="flex flex-col text-xs justify-center items-start">
                <span className="font-semibold">{stream.user.name}</span>
                <span className="text-muted-foreground">{stream.user.username}</span>
              </div>
            </div>
      </Link>))}
    </div>
  );
}
