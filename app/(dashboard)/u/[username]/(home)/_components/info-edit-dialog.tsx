/* eslint-disable react-hooks/refs */
"use client";

import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogClose, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Form, FormItem, FormControl, FormLabel, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Loader2, Trash2 } from "lucide-react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { UploadDropZone } from "@/lib/uploadthing";
import { InfoCardType } from "./info-card";
import { UseFormReturn } from "react-hook-form";

interface InfoEditDialogProps {
    hostIdentity: string,
    form: UseFormReturn<{
        name: string;
        thumbnailUrl: string;
    }, unknown, {
        name: string;
        thumbnailUrl: string;
    }>
}


export function InfoEditDialog({ hostIdentity, form}: InfoEditDialogProps) {
    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();

    const { thumbnailUrl } = form.getValues();
    const { isSubmitting } = form.formState;

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
    )
}