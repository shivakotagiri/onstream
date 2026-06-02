import { TabsContent } from "@/components/ui/tabs";
import { ContactSection } from "./privacy-tab/contact-section"; 
import { SecuritySection } from "./privacy-tab/security-section";
import { PrivacySection } from "./privacy-tab/privacy-section"; 
import { User } from "@/db/schema";

interface BlockedUsersProps {
    blockedId: string;
    blockerId: string;
    blockedUser: User
}



export function PrivacyTab({ currentUser, blockedUsers, isCurrentUserHasPassword }: { 
    currentUser: User, 
    blockedUsers:  BlockedUsersProps[],
    isCurrentUserHasPassword: boolean
}) {
    return (
        <TabsContent value="privacy" className="space-y-8">
            <div className="border-t w-full h-full max-w-7xl flex flex-col mt-10 sm:mt-0 justify-center items-center">
                <ContactSection currentUser={currentUser}/>
                <SecuritySection currentUser={currentUser} isCurrentUserHasPassword={isCurrentUserHasPassword} />
                <PrivacySection blockedUsers={blockedUsers} />
            </div>
        </TabsContent>
    )
}