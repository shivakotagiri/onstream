import { LoaderCircle } from "lucide-react";

export function VideoLoading() {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/95">
            <div className="size-14 rounded-full bg-muted/10 flex items-center justify-center">
                <LoaderCircle className="size-6 text-muted-foreground/50 animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-foreground/80">
                    Connecting to stream
                </span>
                <span className="text-xs text-muted-foreground/50">
                    This may take a moment
                </span>
            </div>
        </div>
    );
}