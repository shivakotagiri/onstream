import { blockUser } from "@/actions/block-users-service";
import { searchUserByUsername } from "@/actions/user";
import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { ShowBlowckedUsersDialog } from "@/components/ui/dialogs/show-blocked-users-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

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

export function PrivacySection({ blockedUsers }: BlockedUsersProps) {
    const [username, setUsername] = useState<string>("");

    

    function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    const handleBlockUser = async () => {
        const searchedUser = await searchUserByUsername(username);
        if(!searchedUser) {
            return {
                error: {
                    message: "User not found",
                }
            }
        } else {
            const res = await blockUser(searchedUser.id);
            if(!res.status) {
                return { error: {message: res.message || "Failed to block the user" }};
            } else {
                toast.success(res.message);
                setUsername("");
                return { error: null }
            }
        }
    }

    return (
        <div className="flex md:flex-row w-full h-full justify-between mt-10 flex-col gap-5">
            <div className="flex flex-col w-full md:max-w-2/5 gap-1 md:border-0">
                <div className="text-base font-semibold">
                    Privacy
                </div>
                <span className="text-muted-foreground text-sm mb-5">
                    Manage your privacy preferences to protect your data and control how your information is used.
                </span>
            </div>
            <div className="flex flex-col gap-5 w-full mb-5">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2">
                        <div className="text-base">Block Users</div>
                        <span className="text-muted-foreground flex flex-col">
                            <span className="text-sm">Blocking a user will:</span>
                            <ul className="text-sm list-disc pl-5">
                                <li>Prevent them from hosting you</li>
                                <li>Prevent them from purchasing gift subs for other users in your channel</li>
                                <li>Filter their messages out of chats you don&apos;t moderate</li>
                                <li>Prevent users from viewing your profile</li>
                                <li>Prevent them from viewing your live broadcasts</li>
                            </ul>
                        </span>
                    </div>
                    <div>
                        <div className="flex flex-col gap-3">
                            <Label>Filter your blocked users or add more</Label>
                            <div className="w-full flex gap-3">
                                <Input 
                                    className="px-3 py-5"
                                    value={username} 
                                    onChange={handleUsernameChange} 
                                />
                                <BetterAuthActionButton 
                                    className="px-5 py-2 cursor-pointer"
                                    action={handleBlockUser}
                                >
                                    Block User
                                </BetterAuthActionButton>
                            </div>
                        </div>
                        <ShowBlowckedUsersDialog blockedUsers={blockedUsers} />
                    </div>
                </div>
            </div>
        </div>
    ) 
}