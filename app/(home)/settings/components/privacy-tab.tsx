"use client";

import { ChangePasswordDialog } from "@/components/ui/dialogs/change-password-dialog"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { currentUserType } from "@/actions/user";
import { Edit2Icon, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { ShowBlowckedUsersDialog } from "@/components/ui/dialogs/show-blocked-users-dialog";

export function PrivacyTab({ currentUser }: { currentUser: currentUserType }) {
    const [editEmail, setEditEmail] = useState<boolean>(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
    const [reveal, setReveal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    async function handleEdit() {
        setEditEmail(true);
        setEmail(currentUser.email);
    }

    function handleReveal() {
        setReveal((reveal) => !reveal);
    }

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePhoneNumberChange(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value);
    }

    function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    const hiddenEmail = email.substring(0, 2) + ".".repeat(email.substring(2).split("@")[0].length) + "@gmail.com";

    return (
        <TabsContent value="privacy" className="space-y-8">
            <div className="border-t w-full h-full max-w-7xl flex flex-col mt-10 sm:mt-0 justify-center items-center">
                <div className="flex md:flex-row w-full h-full justify-between mt-10 flex-col gap-5 border-b pb-5">
                    <div className="flex flex-col w-full md:max-w-2/5 gap-1 md:border-0 border-b">
                        <div className="text-base font-semibold">
                            Contact
                        </div>
                        <span className="text-muted-foreground text-sm mb-5">
                            Keep your contact information up to date so we can reach you for account updates, notifications, and support.
                        </span>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex flex-col">
                                <div className="">Email</div>
                                <span className="text-sm text-muted-foreground">
                                    Verified by connecting with google
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                {editEmail ? 
                                    <div className="w-full flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <Input  
                                                className="px-3 py-5 text-base" 
                                                onChange={handleEmailChange}
                                                value={email} 
                                            />
                                            <span className="text-sm text-muted-foreground">Please confirm your new email address</span>
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            <Button disabled={email.length < 11} className="cursor-pointer">Save Changes</Button>
                                            <Button 
                                                className="cursor-pointer" 
                                                onClick={() => setEditEmail(false)} 
                                                variant={"outline"}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div> :
                                    <div>
                                        { reveal ? currentUser.email: hiddenEmail }
                                    </div>
                                }
                                {!editEmail && <div className="flex gap-5 items-center">
                                    <div 
                                        className="cursor-pointer"
                                        onClick={handleReveal}>{reveal ? <EyeOff size={20} />: <Eye size={20} />}
                                    </div>
                                    <Edit2Icon className="cursor-pointer" onClick={handleEdit} size={15} />
                                </div>}
                            </div>
                            <div>

                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col w-full gap-1">
                            <div className="flex flex-col">
                                <div>Phone number</div>
                                <span className="text-sm text-muted-foreground">You can add your mobile number here</span>
                            </div>
                            <div>
                                {!editPhoneNumber && <Button onClick={() => setEditPhoneNumber(true)} variant={"link"} className="p-0 cursor-pointer text-red-500">
                                    Add Phone number
                                </Button>}
                                {editPhoneNumber && <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <Input  
                                            className="px-3 py-5 text-base" 
                                            onChange={handlePhoneNumberChange}
                                            value={phoneNumber} 
                                            placeholder="+911234567890"
                                        />
                                        <span className="text-sm text-muted-foreground">Please confirm your mobile number</span>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <Button disabled={email.length < 11} className="cursor-pointer">Save Changes</Button>
                                        <Button 
                                            className="cursor-pointer" 
                                            onClick={() => setEditPhoneNumber(false)} 
                                            variant={"outline"}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row w-full h-full justify-between mt-10 flex-col gap-5 border-b pb-10">
                    <div className="flex flex-col w-full md:max-w-2/5 gap-1 md:border-0 border-b">
                        <div className="text-base font-semibold">
                            Security
                        </div>
                        <span className="text-muted-foreground text-sm mb-5">
                            Manage your security settings to keep your account safe.
                        </span>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col">
                                <div className="">Password</div>
                                <span className="text-sm text-muted-foreground">
                                    Improve your security with a strong password.
                                </span>
                            </div>
                            <ChangePasswordDialog currentUser={currentUser} text="Change Password" />
                        </div>
                        <hr />
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <div>Two Factor Authentication</div>
                                <span className="text-sm text-muted-foreground">
                                    Add an extra layer of security to your Onstream account by using your password and a security code on your mobile phone to log in.
                                </span>
                            </div>
                            <Button className="max-w-xs">Set up Two-Factor Authentication</Button>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <div>Sign out everywhere</div>
                                <span className="inline-block text-sm text-muted-foreground">
                                    This will log out you of Twitch everywhere you&apos;re logged in, including third party applications. If you believe your account has been compromised, we recommend you{" "}
                                    
                                    <span className="inline">
                                        <ChangePasswordDialog text="change your password" currentUser={currentUser}/>
                                    </span>
                                </span>
                            </div>
                            <Button className="max-w-xs">Sign out Everywhere</Button>
                        </div>
                    </div>
                </div>
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
                                        <Button className="px-5 py-2">Block User</Button>
                                    </div>
                                </div>
                                <ShowBlowckedUsersDialog />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}