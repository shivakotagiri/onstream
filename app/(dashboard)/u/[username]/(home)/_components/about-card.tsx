/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateUserDetails } from "@/actions/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";

interface AboutCardProps {
    hostName: string,
    hostIdentity: string,
    initialBio: string,
    followersCount: number
}

export function AboutCard({ hostName, hostIdentity, initialBio, followersCount}: AboutCardProps) {
    const [bio, setBio] = useState<string>(initialBio);
    const[isPending, startTransition] = useTransition();
    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setBio(e.target.value);
    }

    function onSubmit() {
        startTransition(() => {
            updateUserDetails(bio)
                .then(() => toast.success("Bio updated"))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <Card className="flex flex-col gap-2">
            <CardHeader className="flex justify-between items-center">
                <CardTitle>
                    About { hostName }
                </CardTitle>
                <span>Edit</span>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="text-muted-foreground text-sm">
                    <span className="text-accent-foreground font-semibold">{ String(followersCount) }</span>
                    <span>&nbsp;followers</span>
                </div>
                <div>
                    { bio || "This user prefers to keep an air of mistery about them."}
                </div>
            </CardContent>
        </Card>
    )
}