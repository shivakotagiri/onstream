"use client";

import { User, Stream } from "@/db/schema"
import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react"
import { Video } from "./video";

interface StreamPlayerProps {
    user: User & { stream: Stream | null },
    stream: Stream,
    isFollowing: boolean
}

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(user.id);

    if(!token || !name || !identity) {
        return <div>
            Cannot watch the stream {token} ------ {name} ---- {identity}
        </div>
    }

    return (
        <div>
            <LiveKitRoom 
                className="grid grid-cols-1 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6 h-full"
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!} 
                token={token}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video 
                        hostName={user.username || ""}
                        hostIdentity={user.id}
                    />
                </div>
            </LiveKitRoom>
        </div>
    )
}