import { TabsContent } from "@/components/ui/tabs";
import { ContactSection } from "./privacy-tab/contact-section"; 
import { SecuritySection } from "./privacy-tab/security-section";
import { PrivacySection } from "./privacy-tab/privacy-section"; 
import { User } from "@/db/schema";
import { TwoFactorAuthentication } from "./privacy-tab/two-factor-authentication";
import { blockedUsersList } from "@/actions/block-service";
import { isUserHasPassword } from "@/actions/user";

export async function PrivacyTab({ currentUser }: { currentUser: User }) {
    const [blockedUsers, isCurrentUserHasPassword] = await Promise.all([
        blockedUsersList(),
        isUserHasPassword(),
    ]);
    return (
        <TabsContent value="privacy" className="space-y-8">
            <div className="border-t w-full h-full max-w-7xl flex flex-col mt-10 sm:mt-0 justify-center items-center">
                <ContactSection currentUser={currentUser}/>
                <SecuritySection 
                    currentUser={currentUser} 
                    isCurrentUserHasPassword={isCurrentUserHasPassword} 
                />
                <TwoFactorAuthentication 
                    isTwoFactorEnabled={currentUser.twoFactorEnabled || false} 
                />
                <PrivacySection blockedUsers={blockedUsers} />
            </div>
        </TabsContent>
    )
}