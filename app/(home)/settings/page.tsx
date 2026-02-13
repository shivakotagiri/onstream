"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/lib/auth-client";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/ui/live-avatar";
import { Button } from "@/components/ui/button";
import { Trash, Trash2, Trash2Icon, TrashIcon } from "lucide-react";

export default function SettingsPage() {
    const session = useSession().data;
    return (
        <div className="h-full w-full mt-20 p-5 lg:px-20">
            <div className="text-3xl max-w-md flex flex-col">
                Settings
                <span className="text-sm text-muted-foreground">Manage your account settings and preferences</span>
            </div>
            <Tabs defaultValue="account" className="mt-5">
                <TabsList className="flex gap-10 bg-background">
                    <TabsTrigger className="text-base px-5 py-4 cursor-pointer" value="account">
                        Account
                    </TabsTrigger>
                    <TabsTrigger className="text-base px-5 py-4 cursor-pointer" value="privacy">
                        Privacy & Security
                    </TabsTrigger>
                    <TabsTrigger className="text-base px-5 py-4 cursor-pointer" value="billings">
                        Billings
                    </TabsTrigger>
                </TabsList>
                <TabsContent className="w-full h-full mt-10" value="account">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-xl">Profile</div>
                                <span className="text-muted-foreground text-xs">Set your account details</span>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col gap-7 max-w-md w-full">
                                    <div className="flex gap-5 w-full max-w-md">
                                        <div className="flex flex-col w-full">
                                            <Label>Name</Label>
                                            <Input className="rounded-sm" readOnly value={session?.user.name || ""} />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <Label>Username</Label>
                                            <Input className="rounded-sm" readOnly value={session?.user.username || ""} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input className="rounded-sm" readOnly value={session?.user.email} />
                                    </div>
                                </div>
                                <div className="w-xs flex flex-col justify-center items-center gap-2">
                                    <UserAvatar 
                                        src={session?.user.image || ""} 
                                        isLive={false}
                                        name={session?.user.name || ""}
                                        className="size-24"
                                        avatarFallbackClassname="text-4xl"
                                    />
                                    <div className="flex gap-2 justify-center items-center">
                                        <Button 
                                            variant={"ghost"} 
                                            className="flex shrink-0 text-xs px-5 border"
                                        >
                                            Edit Photo
                                        </Button>
                                        <Trash2Icon size={20} className="text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </TabsContent>
                <TabsContent className="w-full h-full" value="privacy">
                    <div>Privacy&apos;s tab</div>
                </TabsContent>
                <TabsContent className="w-full h-full" value="billings">
                    <div>Billings&apos;s tab</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}