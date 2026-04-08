"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogs/dialog"
import { useRouter } from "next/navigation";
import { UserAvatar } from "./ui/live-avatar";
import { Stream, User } from "@/db/schema";

interface FollowedProps {
    followedByList: {
        createdAt: Date;
        followerId: string;
        followingId: string;
        following: User & {
            stream: Stream | null,
        }
    }[]
}

export function FollowedList({ followedByList }: FollowedProps) {
    const router = useRouter();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="p-0 text-muted-foreground flex" variant="link">
                    <span className="font-semibold text-foreground">{followedByList.length}</span>
                    <span>Following</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Following</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                    {
                        followedByList.length != 0 ? (followedByList.map((follow) => (
                            <div key={follow.following.id}>
                                <div
                                    onClick={() =>
                                    router.push("/user/" + (follow.following.username || "").replace(/ /g, "").toLowerCase())
                                    }
                                    className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-sidebar-accent cursor-pointer"
                                >
                                    <UserAvatar src={follow.following.image || ""} name={follow.following.name} isLive={follow.following.stream?.isLive} className="size-5" />
                                    <span className="text-sm font-medium truncate">{follow.following.name}</span>
                                </div>
                            </div>
                        ))): 
                        <p>No followings</p>
                    }
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
