"use client";

import { User, Stream } from "@/db/schema"
import { useViewerToken } from "@/hooks/use-viewer-token"

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
            Allowed to watch stream {token} ------ {name} ---- {identity}
        </div>
    )
}