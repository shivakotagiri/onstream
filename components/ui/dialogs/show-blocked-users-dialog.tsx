"use client";

import { Button } from "../button";
import { UserAvatar } from "../live-avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

export function ShowBlowckedUsersDialog() {
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
                            <tr className="flex w-full items-center justify-between pb-3 border-b">
                                <td className="max-w-[10%] w-full flex items-center justify-center pl-5">
                                    <UserAvatar name="KaiCenat" src="" />
                                </td>
                                <td className="w-[30%] text-center">KaiCenat</td>
                                <td className="w-[30%] text-center">21/02/26</td>
                                <td className="w-[30%] text-center text-primary hover:underline underline-offset-4 cursor-pointer">unblock</td>
                            </tr>
                            <tr className="flex w-full items-center justify-between pb-3">
                                <td className="max-w-[10%] w-full flex items-center justify-center pl-5">
                                    <UserAvatar name="IshowSpeed" src="" />
                                </td>
                                <td className="w-[30%] text-center">IshowSpeed</td>
                                <td className="w-[30%] text-center">21/02/26</td>
                                <td className="w-[30%] text-center text-primary hover:underline underline-offset-4 cursor-pointer">unblock</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DialogContent>
        </Dialog>
    )
}