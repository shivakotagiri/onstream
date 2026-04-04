import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
    return (
        <div className="w-screen h-screen sm:pt-23 pt-18 p-10">
            <div className="flex flex-col gap-10">
                <div className="flex justify-between w-full">
                    <Skeleton className="h-13 w-xs rounded-xl" />
                    <Skeleton className="h-10 w-40 rounded-xl" />
                </div>
                <div className="space-y-10 w-full flex flex-col">
                    {[...Array(2)].map((_, idx) => (
                        <Skeleton key={idx} className="w-full h-20 rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    )
}