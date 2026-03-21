"use client";

import { Button } from "../button";
import { UserAvatar } from "../live-avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface BlockedUsersProps {
    blockedUsers: {
        blockedId: string;
        blockerId: string;
        blockedUser: {
            name: string;
            image: string | null;
            id: string;
            email: string;
            emailVerified: boolean;
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

async function handleUnblockUser() {

}

export function ShowBlowckedUsersDialog({ blockedUsers }: BlockedUsersProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant={"link"} 
                    className="p-0 max-w-[150px] cursor-pointer"
                >
                    Show blocked users
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl!">
                <DialogHeader>
                    <DialogTitle>Blocked Users</DialogTitle>
                </DialogHeader>
                <div className="w-full mt-2">
                    <table className="flex flex-col gap-3 rounded-xl border">
                        <thead>
                            <tr className="flex w-full items-center justify-between py-3 bg-primary rounded-b-none rounded-xl border text-white">
                                <th className="w-[10%] text-center"></th>
                                <th className="w-[30%] text-center">Username</th>
                                <th className="w-[30%] text-center">Date Blocked</th>
                                <th className="w-[30%] text-center">Block User</th>
                            </tr>
                        </thead>
                        <tbody>
                            { blockedUsers.map((blockedUser) => (
                                <tr key={blockedUser.blockedId} className="flex w-full items-center justify-between pb-3 border-b">
                                    <td className="max-w-[10%] w-full flex items-center justify-center pl-5">
                                        <UserAvatar name={blockedUser.blockedUser.name} src={blockedUser.blockedUser.image || ""} />
                                    </td>
                                    <td className="w-[30%] text-center">{ blockedUser.blockedUser.name}</td>
                                    <td className="w-[30%] text-center">21/02/26</td>
                                    <td onClick={handleUnblockUser} className="w-[30%] text-center text-primary hover:underline underline-offset-4 cursor-pointer">unblock</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
        </Dialog>
    )
}