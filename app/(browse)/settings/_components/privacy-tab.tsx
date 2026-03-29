import { TabsContent } from "@/components/ui/tabs";
import { currentUserType } from "@/actions/user";
import { ContactSection } from "./privacy-tab/contact-section"; 
import { SecuritySection } from "./privacy-tab/security-section";
import { PrivacySection } from "./privacy-tab/privacy-section"; 

interface BlockedUsersProps {
    blockedId: string;
    blockerId: string;
    blockedUser: {
        name: string;
        image: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        username: string | null;
        displayUsername: string | null;
        phoneNumber: string | null;
        phoneNumberVerified: boolean | null;
        bio: string | null;
        bannerImage: string | null;
        dob: Date | null;
    }
}



export function PrivacyTab({ currentUser, blockedUsers, isCurrentUserHasPassword }: { 
    currentUser: currentUserType, 
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