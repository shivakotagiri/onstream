"use client";

import { changeEmail, currentUserType } from "@/actions/user";
import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2Icon, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export function ContactSection({ currentUser }: { currentUser: currentUserType }) {
    const [editEmail, setEditEmail] = useState<boolean>(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(currentUser.email);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [reveal, setReveal] = useState<boolean>(false);
    const hiddenEmail = email.substring(0, 2) + ".".repeat(email.substring(2).split("@")[0].length) + "@gmail.com";

    async function handleSetEmail() {
        const res = await changeEmail(currentUser.email, email);
        if(!res.status) {
            console.error("[handleSetEmail] Email change failed:", res.message);
            return { error: { message: res.message || "Failed to change email" } }
        } else {
            console.log("[handleSetEmail] Email change initiated successfully");
            toast.success(res.message);
            setEditEmail(false);
            return { error: null }
        }
    }

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value.trim());
    }

    function handlePhoneNumberChange(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value);
    }

    function handleReveal() {
        setReveal((reveal) => !reveal);
    }

    async function handleEdit() {
        setEditEmail(true);
        setEmail(currentUser.email);
    }


    async function handleAddPhoneNumber() {
        console.log(phoneNumber);
    }
    
    return (
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
                                        type="email"
                                        placeholder="Enter your new email"
                                    />
                                    <span className="text-sm text-muted-foreground">Please confirm your new email address</span>
                                </div>
                                
                                <div className="flex gap-3">
                                    <BetterAuthActionButton 
                                        action={handleSetEmail}
                                        disabled={email.length < 5 || !email.includes('@') || email === currentUser.email}
                                        className="cursor-pointer"
                                    >
                                        Save Changes
                                    </BetterAuthActionButton>
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
                                {/* TODO:- add the Phone number by verification */}
                                <Button 
                                    disabled={phoneNumber.length < 13} className="cursor-pointer"
                                    onClick={handleAddPhoneNumber}
                                >
                                    Save Changes
                                </Button>
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
    )
}