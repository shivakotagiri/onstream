import { WifiOff } from "lucide-react";

interface VideoOfflineProps {
    username: string;
}

export function VideoOffline({ username }: VideoOfflineProps) {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 dark:bg-secondary/30 bg-primary">
            <div className="size-14 rounded-full bg-muted/20 flex items-center justify-center">
                <WifiOff className="size-6 text-white/80" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-white/80">
                    {username} is offline
                </span>
                <span className="text-xs text-white/60">
                    Check back later
                </span>
            </div>
        </div>
    );
}