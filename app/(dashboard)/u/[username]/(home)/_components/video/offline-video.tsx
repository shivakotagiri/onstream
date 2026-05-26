import { WifiOff } from "lucide-react";

interface VideoOfflineProps {
    username: string;
}

export function VideoOffline({ username }: VideoOfflineProps) {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/95">
            <div className="size-14 rounded-full bg-muted/10 flex items-center justify-center">
                <WifiOff className="size-6 text-muted-foreground/50" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-foreground/80">
                    {username} is offline
                </span>
                <span className="text-xs text-muted-foreground/50">
                    Check back later
                </span>
            </div>
        </div>
    );
}