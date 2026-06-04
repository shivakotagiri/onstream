"use client";

import { useState } from "react";
import { QRCodeVerify } from "./qr-code-verify";
import { TwoFactorAuthDialog } from "./two-factor-dialog";

interface TwoFactorAuthenticationProps {
    isTwoFactorEnabled: boolean,
}

export type TwoFactorData = {
    totpURI: string;
    backupCodes: string[];
}

export function TwoFactorAuthentication({ 
    isTwoFactorEnabled 
}: TwoFactorAuthenticationProps) {
    const [twoFactorData, setTwoFactorData] = useState<TwoFactorData | null>(null);    
    return (
        <div className="flex py-5 justify-between w-full h-full border-b">
            <div className="flex flex-col gap-1 flex-1/2 w-full">
                <div>Two Factor Authentication</div>
                <span className="text-sm text-muted-foreground max-w-sm">
                    Add an extra layer of security to your Onstream account by using your password and a security code on your mobile phone to log in.
                </span>
            </div>
            <div className="flex-1/2 flex justify-end w-full pl-5">
                {!twoFactorData ? <TwoFactorAuthDialog 
                    isTwoFactorEnabled={isTwoFactorEnabled}
                    setTwoFactorData={setTwoFactorData}
                /> : <QRCodeVerify 
                    {...twoFactorData} 
                    onDone={() => setTwoFactorData(null)} 
                />}
            </div>
        </div>
    )
}