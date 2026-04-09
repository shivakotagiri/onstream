/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { InfoIcon } from "lucide-react";
import { ComponentRef, useRef, useState } from "react";
import { useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export default function GenerateConnection() {
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const [ isPending, startTransition ] = useTransition();
    const closeRef = useRef<ComponentRef<"button">>(null);

    async function handleGenerateConnection() {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress created");
                    closeRef.current?.click();
                }).catch((err) => toast.error("Something went wrong"));
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Generate Connection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection
                    </DialogTitle>
                </DialogHeader>
                <Alert>
                    <InfoIcon />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using current connection
                    </AlertDescription>
                </Alert>
                <Select disabled={isPending} value={ingressType} onValueChange={(value) => setIngressType(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Ingress Type"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={RTMP}>RTMP</SelectItem>
                            <SelectItem value={WHIP}>WHIP</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DialogFooter className="w-full sm:justify-between mt-3">
                    <Button disabled={isPending} onClick={handleGenerateConnection} className="cursor-pointer">
                        Generate
                    </Button>
                    <DialogClose ref={closeRef} asChild>
                        <Button className="px-5 cursor-pointer py-2" variant={"secondary"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}