/* eslint-disable @typescript-eslint/no-unused-vars */
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
        return <div className="flex justify-center items-center w-full h-[90vh]">
            Cannot watch the stream {token} ------ {name} ---- {identity}
        </div>
    }

    return (
        <div className="flex w-full border-red-500 border sm:max-w-[75%]">
            <LiveKitRoom 
                className="lg:gap-y-0 h-full w-full"
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!} 
                token={token}
                options={{
                    dynacast: true,
                    adaptiveStream: true
                }}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 w-full">
                    <Video 
                        hostName={user.username || ""}
                        hostIdentity={user.id}
                    />
                </div>
            </LiveKitRoom>
        </div>
    )
}