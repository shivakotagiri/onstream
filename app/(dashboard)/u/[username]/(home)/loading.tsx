import { StreamPlayerSkeleton } from "./_components/stream-player";

export default function Loading() {
    return (
        <div className="w-screen pt-18 sm:pt-13 flex sm:flex-row flex-col">
            <StreamPlayerSkeleton />
        </div>
    )
}