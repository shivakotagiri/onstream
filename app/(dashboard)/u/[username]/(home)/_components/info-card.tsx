/* eslint-disable react-hooks/refs */
"use client";

import { updateStream } from "@/actions/stream";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropZone } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface InfoCardProps {
    hostIdentity: string;
    initialThumbnailUrl: string | null;
    initialName: string;
}

const InfoCardSchema = z.object({
    name: z.string().min(1),
    thumbnailUrl: z.string(),
});

type InfoCardType = z.infer<typeof InfoCardSchema>;

export function InfoCard({ initialName, initialThumbnailUrl, hostIdentity }: InfoCardProps) {
    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: initialName,
            thumbnailUrl: initialThumbnailUrl || "",
        },
        resolver: zodResolver(InfoCardSchema),
    });

    const { isSubmitting } = form.formState;
    const { thumbnailUrl } = form.getValues();

    async function handleStreamInfoUpdate(data: InfoCardType) {
        const res = await updateStream({ userId: hostIdentity, name: data.name, thumbnailUrl: data.thumbnailUrl });
        if (!res || res.length === 0) {
            toast.error("Something went wrong");
        } else {
            toast.success("Stream info updated");
            closeRef.current?.click();
        }
    }

    async function handleThumbnailRemove() {
        if (!thumbnailUrl) return toast.error("No thumbnail to remove");
        const res = await updateStream({ thumbnailUrl: "", userId: hostIdentity });
        if (!res || res.length === 0) {
            toast.error("Something went wrong");
        } else {
            toast.success("Thumbnail removed");
            closeRef.current?.click();
            router.refresh();
        }
    }

    return (
        <div className="px-5">
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold">Stream info</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1.5 text-xs cursor-pointer h-8">
                                <Pencil className="size-3" />
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit stream info</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleStreamInfoUpdate)} className="space-y-5 pt-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium">Stream title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter a stream title"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                        className="h-9"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Thumbnail</span>
                                            {thumbnailUrl && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    type="button"
                                                    onClick={handleThumbnailRemove}
                                                    className="h-7 gap-1.5 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                                >
                                                    <Trash2 className="size-3" />
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <div className="rounded-lg border border-dashed overflow-hidden">
                                            {thumbnailUrl ? (
                                                <div className="relative w-full aspect-video">
                                                    <Image
                                                        src={thumbnailUrl}
                                                        fill
                                                        alt="Stream thumbnail"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <UploadDropZone
                                                    endpoint="thumbnailUploader"
                                                    onClientUploadComplete={(res) => {
                                                        form.setValue("thumbnailUrl", res[0].url, {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        });
                                                        closeRef.current?.click();
                                                        router.refresh();
                                                    }}
                                                    appearance={{
                                                        label: { color: "#FFFFFF" },
                                                        allowedContent: { color: "#FFFFFF" },
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-1">
                                        <DialogClose asChild ref={closeRef}>
                                            <Button variant="outline" type="button" className="cursor-pointer">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="cursor-pointer min-w-16"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="size-4 animate-spin" />
                                            ) : (
                                                "Save"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent className="space-y-3 pt-0 -translate-y-5">
                    <div className="space-y-0.5">
                        <span className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">Title</span>
                        <p className="text-sm">{form.getValues().name}</p>
                    </div>
                    <div className="space-y-1.5">
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