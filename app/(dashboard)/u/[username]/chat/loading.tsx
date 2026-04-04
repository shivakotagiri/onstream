import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
    return (
        <div className="w-screen h-screen sm:pt-23 pt-18 p-10">
            <div className="flex flex-col gap-10">
                <Skeleton className="h-13 w-50 rounded-lg" />
                <div className="space-y-10 w-full flex flex-col">
                    {[...Array(3)].map((_, idx) => (
                        <Skeleton key={idx} className="w-full h-20 rounded-md" />
                    ))}
                </div>
            </div>
        </div>
    )
}