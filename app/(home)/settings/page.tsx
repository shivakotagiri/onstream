"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/lib/auth-client";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/ui/live-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const session = useSession().data;

  const [bannerUrl, setBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <div className="w-full min-h-screen mt-20 px-6 lg:px-24 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="account">
            <TabsList className="bg-background w-full justify-start gap-10 rounded-none">
                <TabsTrigger value="account" className="text-base py-4">
                Account
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-base py-4">
                Privacy & Security
                </TabsTrigger>
                <TabsTrigger value="billings" className="text-base py-4">
                Billings
                </TabsTrigger>
            </TabsList>
            <hr className="mt-3" />
            <TabsContent value="account" className="mt-10 space-y-10">
                <div className="rounded-xl border bg-card overflow-hidden">
                <div
                    className="h-48 w-full bg-muted bg-cover bg-center"
                    style={{
                    backgroundImage: `url(${
                        bannerUrl || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                    })`,
                    }}
                />
                <div className="p-6 space-y-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <UserAvatar
                            src={avatarUrl || session?.user.image || ""}
                            isLive={false}
                            name={session?.user.name || ""}
                            className="size-28"
                            avatarFallbackClassname="text-4xl"
                        />
                        <div className="w-64 space-y-2 flex flex-col justify-center items-center">
                            <Label>Profile Picture URL</Label>
                            <Input
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    readOnly
                                    value={session?.user.name || ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input
                                    readOnly
                                    value={session?.user.username || ""}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input readOnly value={session?.user.email || ""} />
                        </div>

                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea 
                                className="min-h-25" 
                                placeholder="Write something about yourself..." 
                            />
                        </div>

                        <div className="space-y-2">
                        <Label>Profile Banner URL</Label>
                        <Input
                            value={bannerUrl}
                            onChange={(e) => setBannerUrl(e.target.value)}
                            placeholder="https://example.com/banner.jpg"
                        />
                        </div>

                        <Button className="mt-4">
                        Save Changes
                        </Button>
                    </div>
                    </div>
                </div>
                </div>

                <div className="rounded-xl border p-6 space-y-5">
                <div>
                    <h2 className="text-xl font-semibold">
                    Deactivate your account
                    </h2>
                    <p className="text-sm text-muted-foreground">
                    Actions here cannot be undone
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                    <p className="font-medium">Deactivate Account</p>
                    <p className="text-sm text-muted-foreground">
                        Temporarily disable your account. You can reactivate later.
                    </p>
                    </div>
                    <Button variant="outline" className="border-red-500 text-red-600">
                    Deactivate
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data.
                    </p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                    Delete Account
                    </Button>
                </div>
                </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-10">
                <div className="rounded-xl border p-6 bg-card space-y-6">
                    <h2 className="text-xl font-semibold">
                        Privacy & Security
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Private Account</p>
                            <p className="text-sm text-muted-foreground">
                                Only approved followers can see your content
                            </p>
                        </div>
                        <Button variant="outline">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Change Password</p>
                            <p className="text-sm text-muted-foreground">
                                Update your account password
                            </p>
                        </div>
                        <Button variant="outline">Update</Button>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="billings" className="mt-10">
                <div className="rounded-xl border p-6 bg-card space-y-6">
                    <h2 className="text-xl font-semibold">
                        Billing
                    </h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Current Plan</p>
                            <p className="text-sm text-muted-foreground">
                                Free Plan
                            </p>
                        </div>
                        <Button>Upgrade</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Payment Method</p>
                            <p className="text-sm text-muted-foreground">
                                No payment method added
                            </p>
                        </div>
                        <Button variant="outline">Add</Button>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
