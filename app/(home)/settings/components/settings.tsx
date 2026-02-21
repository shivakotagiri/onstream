"use client";

import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { AccountTab } from "./account-tab";
import { PrivacyTab } from "./privacy-tab";
import { userSettingsTabStore } from "@/store/settings-tab";
import { currentUserType } from "@/actions/user";

export function Settings({ currentUser }: { currentUser: currentUserType }) {
    const { tab, setTab } = userSettingsTabStore();
    if(!currentUser || !currentUser.id) return <div>User not found</div>
    return (
        <Tabs value={tab} defaultValue="account" onValueChange={setTab}>
          <TabsList className="bg-transparent w-full justify-start gap-4 lg:gap-8 rounded-none p-0 h-auto flex-wrap mb-5">
            <TabsTrigger 
              value="account" 
              className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all border-none shadow-none"
            >
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all border-none shadow-none"
            >
              Privacy and Security
            </TabsTrigger>
            <TabsTrigger 
              value="billings" 
              className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all border-none shadow-none"
            >
              Billings
            </TabsTrigger>
          </TabsList>
          <AccountTab currentUser={currentUser} />
          <PrivacyTab currentUser={currentUser} />
        </Tabs>
    )
}