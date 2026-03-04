/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/ui/live-avatar";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { user } from "@/db/schema";
import { currentUserType, updateUserDetails } from "@/actions/user";
import { eq } from "drizzle-orm";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteUserDialog } from "@/components/ui/dialogs/delete-user-dialog"; 

export function AccountTab({ currentUser }: { currentUser: currentUserType }) {
    const [name, setName] = useState<string>(currentUser.name || "");
    const [username, setUsername] = useState<string>(currentUser.username || "");
    const [bio, setBio] = useState<string>(currentUser.bio || "");
    const [bannerUrl, setBannerUrl] = useState<string>(currentUser.bannerImage || "");
    const [imageUrl, setImageUrl] = useState<string>(currentUser.image || "");

    async function handleSubmit() {
      const res = await updateUserDetails(name, bio, bannerUrl)
      if(!res.status) {
          return {
              error: {
                  message: res.message,
              }
          }
      }
      toast.success(res.message);
      return { error: null };
    }

    async function handleProfilePicSubmit(): Promise<{ error: { message?: string } | null }> {
        try {
            const res = await db.update(user).set({
                image: imageUrl.trim(),
            }).where(eq(user.id, currentUser.id)).returning();

            if(!res.length) {
                return {
                    error: {
                        message: "Unable to update the changes",
                    }
                }
            }
            toast.success("Update profile picture successfull");
            return { error: null };
        } catch( error ) {
            return {
                error: {
                    message: "Something went wrong",
                }
            }
        }
    }

    async function handleProfilePicDelete(): Promise<{ error: { message?: string } | null }> {
        try {
            const res = await db.update(user).set({
                image: "",
            }).where(eq(user.id, currentUser.id)).returning();

            if(!res.length) {
                return {
                    error: {
                        message: "Unable to delete the profile picture",
                    }
                }
            }
            toast.success("Deleted profile picture");
            return { error: null };
        } catch( error ) {
            return {
                error: {
                    message: "Something went wrong",
                }
            }
        }
    }

    return (
        <TabsContent value="account" className="space-y-0">
            <div className="flex flex-col md:flex-row gap-8 py-10 mt-10 sm:mt-0 border-t border-border">
              <div className="w-full md:w-72 shrink-0">
                <h2 className="text-base font-semibold text-foreground mb-1">Profile</h2>
                <p className="text-sm text-muted-foreground">Set your account details</p>
              </div>
              <div className="flex-1 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-normal text-muted-foreground">Name</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring text-foreground h-11 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-normal text-muted-foreground">Username</Label>
                      <Input
                        readOnly
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring text-foreground h-11 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-1.5">
                    <Label className="text-xs font-normal text-muted-foreground">Email</Label>
                    <Input 
                        value={user.email || ""}
                        readOnly
                        className="bg-transparent border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring text-foreground h-11 rounded-lg" 
                    />
                  </div> */}

                  <div className="space-y-1.5">
                    <Label className="text-xs font-normal text-muted-foreground">Bio</Label>
                    <Textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a little bit about yourself..."
                      className="bg-transparent border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring text-foreground min-h-[100px] rounded-lg resize-y" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-normal text-muted-foreground">Profile Banner URL</Label>
                    <Input 
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                      placeholder="https://example.com/banner.jpg"
                      className="bg-transparent border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring text-foreground h-11 rounded-lg" 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <BetterAuthActionButton action={(handleSubmit)} type="button" className="rounded-full shadow-none bg-foreground dark:text-black text-white hover:dark:bg-neutral-300 hover:bg-neutral-900">Save Changes</BetterAuthActionButton>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-5 shrink-0 w-full lg:w-48 lg:pt-2">
                  <UserAvatar
                    src={imageUrl}
                    isLive={false}
                    name={name}
                    className="size-32 rounded-full object-cover ring-1 ring-border"
                    avatarFallbackClassname="text-4xl"
                  />
                  
                  <div className="w-full space-y-2">
                    <Label className="text-xs font-normal text-muted-foreground text-center block">Profile Picture URL</Label>
                    <Input 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="bg-transparent border-input focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring text-foreground h-10 text-xs rounded-lg text-center" 
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full mt-2">
                    <BetterAuthActionButton action={handleProfilePicSubmit} type="button" variant="outline" className="w-full rounded-full bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground h-9 px-4 text-xs font-normal shadow-none">
                      Upload profile pic
                    </BetterAuthActionButton>
                    <BetterAuthActionButton action={handleProfilePicDelete} variant="outline" size="icon" className="rounded-full bg-transparent border-input text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive h-9 w-9 shrink-0 shadow-none transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </BetterAuthActionButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 py-10 border-t border-border">
              <div className="w-full md:w-72 shrink-0">
                <h2 className="text-base font-semibold text-foreground mb-1">Danger Zone</h2>
                <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-border rounded-xl bg-card">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-foreground">Deactivate Account</h3>
                    <p className="text-xs text-muted-foreground">
                      Temporarily hide your profile, followers, and content. You can reactivate by logging back in.
                    </p>
                  </div>
                  <Button variant="outline" className="text-foreground border-input shadow-none hover:bg-secondary">
                    Deactivate Account
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-destructive/20 rounded-xl bg-destructive/5">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-destructive">Delete Account</h3>
                    <p className="text-xs text-muted-foreground">
                      Permanently remove your account and all associated data from our servers. This action cannot be undone.
                    </p> 
                  </div>
                  <DeleteUserDialog />
                </div>
              </div>
            </div>
          </TabsContent>
    )
}