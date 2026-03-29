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
import { UserAvatar } from "@/components/ui/live-avatar";

interface FollowersProps {
    followersOfFollowing: {
        createdAt: Date;
        followerId: string;
        followingId: string;
        follower: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
            username: string | null;
            displayUsername: string | null;
            phoneNumber: string | null;
            phoneNumberVerified: boolean | null;
            bio: string | null;
            bannerImage: string | null;
            dob: Date | null;
        };
    }[]
}

export function FollowerList({ followersOfFollowing }: FollowersProps) {
    const router = useRouter();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="p-0 text-muted-foreground flex" variant="link">
                    <span className="text-foreground font-semibold">{ followersOfFollowing.length }</span>
                    <span>Followers</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Followers</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                    {
                        followersOfFollowing.length != 0 ? (followersOfFollowing.map((follow) => (
                            <div key={follow.follower.id}>
                                <div
                                    onClick={() =>
                                    router.push("/user/" + (follow.follower.username || "").replace(/ /g, "").toLowerCase())
                                    }
                                    className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-sidebar-accent cursor-pointer"
                                >
                                    <UserAvatar src={follow.follower.image || ""} name={follow.follower.name} isLive={false} className="size-5" />
                                    <span className="text-sm font-medium truncate">{follow.follower.name}</span>
                                </div>
                            </div>
                        ))): 
                        <p>No followers</p>
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
