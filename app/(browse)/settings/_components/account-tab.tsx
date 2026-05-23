/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BetterAuthActionButton } from "@/components/better-auth-action-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/ui/live-avatar";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { deleteProfilePic, updateProfilePic, updateUserDetails } from "@/actions/user";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteUserDialog } from "@/components/ui/dialogs/delete-user-dialog"; 
import { Trash } from "lucide-react";
import { Stream, User } from "@/db/schema";

export function AccountTab({ currentUser }: { currentUser: User }) {
    const [name, setName] = useState<string>(currentUser.name || "");
    const [username, setUsername] = useState<string>(currentUser.username || "");
    const [bio, setBio] = useState<string>(currentUser.bio || "");
    const [bannerUrl, setBannerUrl] = useState<string>(currentUser.bannerImage || "");
    const [imageUrl, setImageUrl] = useState<string>(currentUser.image || "");

    async function handleSubmit() {
      const res = await updateUserDetails({name, bio, bannerImage: bannerUrl})
      if(!res.status) {
          return {
              error: {
                  message: res.message,
              }
          }
      } else {
        toast.success(res.message);
        return { error: null };
      }
    }

    async function handleProfilePicSubmit() {
      const res = await updateProfilePic(imageUrl);
      if(!res.status) {
          return {
              error: {
                  message: res.message
              }
          }
      } else {
        toast.success(res.message);
        return { error: null };
      }
    }

    async function handleProfilePicDelete() {
      const res = await deleteProfilePic();

      if(!res.status) {
          return {
              error: {
                  message: res.message,
              }
          }
      }
      else {
        toast.success(res.message);
        return { error: null };
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
                    <BetterAuthActionButton action={handleProfilePicSubmit} type="button" variant="outline" className="sm:w-full w-[85%] rounded-full bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground h-9 px-4 text-xs font-normal shadow-none">
                      Upload profile pic
                    </BetterAuthActionButton>
                    <BetterAuthActionButton action={handleProfilePicDelete} variant="outline" size="icon" className="rounded-full bg-transparent border-input text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive h-9 w-9 shrink-0 shadow-none transition-colors">
                      <Trash />
                    </BetterAuthActionButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 py-10 border-t border-border">
              <div className="w-full md:w-72 shrink-0">
                <h2 className="text-base font-semibold text-foreground mb-1">Delete Account</h2>
                <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
              </div>
              
              <div className="flex-1 space-y-4">
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