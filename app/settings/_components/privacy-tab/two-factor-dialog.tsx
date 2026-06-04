"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import InputPassword from "@/components/ui/input-password";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { disableTwoFactor, enableTwoFactor } from "@/actions/two-factor";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { TwoFactorData } from "./two-factor-authentication";


interface TwoFactorAuthDialogProps {
    isTwoFactorEnabled: boolean,
    setTwoFactorData: Dispatch<SetStateAction<TwoFactorData | null>>
}

type FormData = {
    password: string
}

export function TwoFactorAuthDialog({ isTwoFactorEnabled,  setTwoFactorData}: TwoFactorAuthDialogProps) {
    const router = useRouter();
    const form = useForm<FormData>({
            defaultValues: {
                password: ""
            }
        });
        async function handleEnableTwoFactorAuth(data: FormData) {
            const res = await enableTwoFactor(data.password);
            if(!res) {
                toast.error("Failed to enable 2FA");
                return;
            }
            setTwoFactorData(res);
            form.reset();
            router.refresh();
        }
    
        async function handleDisableTwoFactorAuth(data: FormData) {
            const res = await disableTwoFactor(data.password);
            if(!res.status) {
                toast.error("Failed to disable 2FA");
                return;
            } else {
                toast.success("Disabled Two Factor Authentication")
            }
            setTwoFactorData(null);
            form.reset();
            router.refresh();
        }
    return (
        <Dialog>
            <DialogTrigger asChild suppressContentEditableWarning className="flex items-start">
                <Button className="cursor-pointer">
                    {isTwoFactorEnabled ? "Disable": "Enable"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Enable two factor authentication
                    </DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque suscipit officiis maxime quia consequatur cupiditate.
                    </DialogDescription>
                </DialogHeader> 
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(isTwoFactorEnabled ?handleDisableTwoFactorAuth: handleEnableTwoFactorAuth)}
                        className="space-y-5"
                    >
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <InputPassword 
                                            {...field}
                                            className="w-full"
                                            placeholder="••••••••••••••••••••••"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center w-full">
                            <Button type="submit" className="cursor-pointer">
                                Submit
                            </Button>
                            <DialogClose asChild>
                                <Button className="cursor-pointer" variant={"outline"}>Close</Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}