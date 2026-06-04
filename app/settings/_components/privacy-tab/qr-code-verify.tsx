"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { verifyTwoFactorTotp } from "@/actions/two-factor";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface QRCodeVerifyProps {
    totpURI: string;
    backupCodes: string[];
    onDone: () => void;
}

type QrForm = {
    otp: string,
}

export function QRCodeVerify({ totpURI, backupCodes, onDone}: QRCodeVerifyProps) {
    const router = useRouter();
    const form = useForm<QrForm>({
        defaultValues: {
            otp: ""
        }
    });
    const [enabled, setEnabled] = useState<boolean>(false);

    async function handleTotpURI(data: QrForm) {
        const res = await verifyTwoFactorTotp(data.otp);
        if(res.token) {
            setEnabled(true);
            toast.success("Two factor authentication enabled");
            router.refresh();
        } else {
            toast.error("Failed to verify the code/otp");
        }
    }

    function downloadBackupCodes() {
        const content = [
            "Backup Codes",
            "============",
            "",
            ...backupCodes,
            "",
            "Store these codes in a safe place.",
            "Each code can typically be used to access your account."
        ].join("\n");

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "backup-codes.txt";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    if(enabled) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        Save backup codes
                    </CardTitle>
                    <CardDescription>
                        Save these backup codes in a safe place. You can use them to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full grid grid-cols-2">
                    {backupCodes.map((code, idx) => (
                        <div key={idx} className="text-sm p-1 col-span-1">
                            {code}
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Button onClick={downloadBackupCodes} className="gap-1 cursor-pointer">
                        <DownloadIcon className="size-4" />
                        <span>Download</span>
                    </Button>
                    <Button onClick={onDone} variant={"outline"} className="px-5 cursor-pointer">
                        Done
                    </Button>
                </CardFooter>
            </Card>
        )
    }
    return (
        <div className="w-full flex flex-col justify-center items-start gap-5">
            <div className="space-y-3">
                <QRCode value={totpURI} className="border border-white" />
                <span className="text-muted-foreground text-justify w-full text-sm">
                    Please scan the above QR code in any authenticator app in your device and copy the otp within time and paste it in below input box and click on the verify button to enable the Two Factor Authentication
                </span>
            </div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleTotpURI)} className="w-full space-y-3">
                    <FormField 
                        name="otp"
                        render={({field}) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="font-semibold">Enter otp</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text"
                                        {...field}
                                        placeholder="Please enter the otp"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Verify
                    </Button>
                </form>
            </Form>
        </div>
    )
}


