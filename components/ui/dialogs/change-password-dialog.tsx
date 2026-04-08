"use client";

import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./dialog";
import { UserAvatar } from "../live-avatar";
import { ChangeEvent, useState } from "react";
import InputPassword from "../input-password";
import { Label } from "@/components/ui/label";
import { Button } from "../button"; 
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { changePassword } from "@/actions/password";
import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { toast } from "sonner";
import { User } from "@/db/schema";

export function ChangePasswordDialog({ currentUser, className, text }: {
    currentUser: User,
    className?: string,
    text: string
}) {

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const router = useRouter();

    const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }

    async function handleSetPassword() {
        const res = await changePassword(currentPassword.trim(), newPassword.trim());
        if(!res.status) {
            return { error: { message: res.message } };
        } else {
            toast.success(res.message);
            return { error: null };
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="hover:underline inline cursor-pointer text-red-500 underline-offset-5 text-sm">
                    { text }
                </p>
            </DialogTrigger>
            <DialogContent className={cn(className)}>
                <DialogHeader>
                    <DialogTitle>Confirm your password</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 items-center">
                            <UserAvatar 
                                src={currentUser.image || ""} 
                                name={currentUser.name}
                                className="size-7" 
                            />
                            <div>
                                {currentUser.username || ""}
                            </div>
                        </div>
                        <span className="text-sm text-muted-foreground">For security, please enter your password to continue.</span>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="w-full flex flex-col gap-2">
                                <Label>Current Password</Label>
                                <InputPassword 
                                    className="w-full max-w-full"
                                    placeholder="........" 
                                    value={currentPassword} 
                                    onChange={handleCurrentPasswordChange} 
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Label>New Password</Label>
                                <InputPassword 
                                    className="w-full max-w-full"
                                    placeholder="........" 
                                    value={newPassword} 
                                    onChange={handleNewPasswordChange} 
                                />
                            </div>
                        </div>
                        <span onClick={() => router.push("/auth/reset-password")} className="text-sm text-primary cursor-pointer hover:underline">Forgot password?</span>
                    </div>
                </div>
                <DialogFooter className="flex w-full justify-between">
                    <BetterAuthActionButton action={handleSetPassword} className="flex-1">Set Password</BetterAuthActionButton>
                    <DialogClose asChild className="max-w-[125px] w-full">
                        <Button variant={"outline"} className="w-full">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}