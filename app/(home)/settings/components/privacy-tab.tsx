"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { currentUserType } from "@/lib/user-data";
import { Edit2Icon, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function PrivacyTab({ currentUser }: currentUserType) {
    const [editEmail, setEditEmail] = useState<boolean>(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
    const [reveal, setReveal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(currentUser.email);

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

    const hiddenEmail = email.substring(0, 2) + ".".repeat(email.substring(2).split("@")[0].length) + "@gmail.com";

    return (
        <TabsContent value="privacy" className="space-y-8">
            <div className="border-t w-full h-full max-w-7xl flex flex-col mt-10 sm:mt-0 justify-center items-center">
                <div className="flex md:flex-row w-full h-full justify-between mt-10 flex-col gap-5">
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
                                    <Edit2Icon className="cursor-pointer" onClick={handleEdit} size={15} />
                                    <div 
                                        className="cursor-pointer"
                                        onClick={handleReveal}>{reveal ? <EyeOff size={20} />: <Eye size={20} />}</div>
                                </div>}
                            </div>
                            <div>

                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col w-full gap-3">
                            <div className="flex flex-col">
                                <div>Phone number</div>
                                <span className="text-sm text-muted-foreground">You can add your mobile number here</span>
                            </div>
                            <div>
                                {!editPhoneNumber && <Button onClick={() => setEditPhoneNumber(true)} variant={"link"} className="p-0 text-foreground cursor-pointer">Add Phone number</Button>}
                                {editPhoneNumber && <div className="w-full flex flex-col gap-4">
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
            </div>
        </TabsContent>
    )
}