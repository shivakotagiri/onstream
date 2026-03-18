"use client";

import { Skeleton } from "@/components/ui/skeleton"; 

export function ProfileBannerSkeleton() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full relative">
        <div className="relative w-full h-[200px] md:h-[420px] overflow-hidden border-b border-border">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="px-6 md:px-8 pb-8 flex flex-col w-full">
          <div className="w-full flex justify-between items-center gap-4 -mt-16 relative z-10 mb-4">
            <Skeleton className="size-32 rounded-full border-4 border-background" />
            <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 pb-2">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="max-w-2xl space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="flex gap-4 mt-3">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="mt-4 space-y-2 max-w-2xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      </div>
    </div>
  );
}