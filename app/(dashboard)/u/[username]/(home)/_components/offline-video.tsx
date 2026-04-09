import { WifiOff } from "lucide-react"

interface VideoOfflineProps {
    username: string
}

export function VideoOffline({ username }: VideoOfflineProps) {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="gap-y-2 flex flex-col justify-center items-center">
                <WifiOff className="w-7 h-7 text-muted-foreground" />
                <span className="text-muted-foreground text-base">{username} is offline</span>
            </div>
        </div>
    )
}