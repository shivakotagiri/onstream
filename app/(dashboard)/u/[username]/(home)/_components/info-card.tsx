"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { InfoEditDialog } from "./info-edit-dialog";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export interface InfoCardProps {
    hostIdentity: string;
    initialThumbnailUrl: string | null;
    initialName: string;
}

const InfoCardSchema = z.object({
    name: z.string().min(1),
    thumbnailUrl: z.string(),
});

export type InfoCardType = z.infer<typeof InfoCardSchema>;

export function InfoCard({ initialName, initialThumbnailUrl, hostIdentity }: InfoCardProps) {
    const form = useForm({
        defaultValues: {
            name: initialName,
            thumbnailUrl: initialThumbnailUrl || "",
        },
        resolver: zodResolver(InfoCardSchema),
    });

    const { thumbnailUrl } = form.getValues();
    return (
        <div className="px-5">
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold">Stream info</CardTitle>
                    <InfoEditDialog 
                        hostIdentity={hostIdentity} 
                        form={form}
                    />
                </CardHeader>
                <CardContent className="space-y-3 pt-0 -translate-y-5">
                    <div className="space-y-0.5">
                        <span className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">Title</span>
                        <p className="text-sm">{form.getValues().name}</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">Thumbnail</span>
                        {thumbnailUrl ? (
                            <div className="relative w-40 aspect-video rounded-md overflow-hidden border">
                                <Image
                                    src={thumbnailUrl}
                                    fill
                                    alt="Thumbnail"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-40 aspect-video rounded-md border border-dashed flex items-center justify-center">
                                <ImageIcon className="size-4 text-muted-foreground/30" />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}