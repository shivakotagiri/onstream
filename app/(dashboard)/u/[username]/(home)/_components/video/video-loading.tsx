import { LoaderCircle } from "lucide-react";

export function VideoLoading() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="gap-y-2 flex flex-col justify-center items-center">
                <LoaderCircle className="w-7 h-7 text-muted-foreground animate-spin" />
                <span className="text-muted-foreground text-base">Connecting...</span>
            </div>
        </div>
    )
}


