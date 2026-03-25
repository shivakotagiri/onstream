import { Skeleton } from "@/components/ui/skeleton";

export function SettingSkeleton() {
    return (
        <div className="h-full w-full max-w-7xl flex flex-col gap-10">
            <div className="flex flex-col gap-3">
                <Skeleton className="h-6.5 w-25" />
                <Skeleton className="h-3 w-65" />
            </div>
            <div className="flex sm:flex-row flex-col gap-5">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <div  className="w-full h-full flex flex-col gap-10">
                {[1, 2, 3].map((_ele, idx) => (
                    <div key={idx} className="flex gap-10 sm:flex-row flex-col w-full h-full max-h-40">
                        <Skeleton className="max-w-[20%] max-h-15 w-full h-10"/>
                        <Skeleton className="max-w-[80%] max-h-45 w-full h-full"/>
                    </div>
                ))}
            </div>
        </div>
    )
}