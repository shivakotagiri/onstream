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
import { Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface InfoCardProps {
    hostIdentity: string,
    initialThumbnailUrl: string | null,
    initialName: string
}  

const InfoCardSchema = z.object({
    name: z.string(),
    thumbnailUrl: z.string()
})

type InfoCardType = z.infer<typeof InfoCardSchema>;


export function InfoCard({ initialName, initialThumbnailUrl, hostIdentity }: InfoCardProps) {
    const closeRef = useRef<ElementRef<"button">>(null);
    const form = useForm({
        defaultValues: {
            name: initialName,
            thumbnailUrl: initialThumbnailUrl || ""
        },
        resolver: zodResolver(InfoCardSchema)
    });

    const { isSubmitting } = form.formState; 

    async function handleStreamInfoUpdate(data: InfoCardType) {
        const res = await updateStream({ userId: hostIdentity, name: data.name, thumbnailUrl: data.thumbnailUrl });
        if(!res || res.length == 0) {
            toast.error("Something went wrong");
        } else {
            toast.success("Stream info updated");
            closeRef.current?.click();
        }
        return res;
    }

    const { thumbnailUrl } = form.getValues();
    const router = useRouter();

    async function handleThumbnailRemove() {
        if(!thumbnailUrl) {
            toast.error("Invalid");
            return;
        }
        const res = await updateStream({ thumbnailUrl: "", userId: hostIdentity });
        if(!res || res.length == 0) {
            toast.error("Something went wrong");
        } else {
            toast.success("Thumbnail removed");
            closeRef.current?.click();
            router.refresh();
        }
    }

    return (
        <div className="px-5">
            <Card className="gap-3">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>
                        Edit your stream info
                    </CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant={"link"}
                                size={"sm"}
                                type="button"
                                className="text-base text-accent-foreground cursor-pointer"
                            >
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Edit your stream info
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleStreamInfoUpdate)} className="space-y-5">
                                    <FormField 
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Please enter the stream name"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span>Thumbnail Url</span>
                                            <Button 
                                                variant={"ghost"} 
                                                size={"icon-sm"}
                                                className="w-4 h-4 hover:cursor-pointer"
                                                type="button"
                                                onClick={handleThumbnailRemove}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                        <div className="rounded-xl border outline-dashed outline-muted">
                                            { thumbnailUrl ? <div className="relative w-[200px] aspect-video h-full">
                                                <Image 
                                                    src={thumbnailUrl} 
                                                    fill 
                                                    alt="Thumbnail URL" 
                                                    className="absolute object-cover inset-0" 
                                                />
                                            </div>: <UploadDropZone 
                                                endpoint={"thumbnailUploader"} 
                                                onClientUploadComplete={(res) => {
                                                    form.setValue("thumbnailUrl", res[0].url, {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                    });
                                                    closeRef.current?.click();
                                                    router.refresh();
                                                }}
                                                appearance={{
                                                    label: {
                                                        color: "#FFFFFF"
                                                    },
                                                    allowedContent: {
                                                        color: "FFFFFF"
                                                    }
                                                }}
                                            />}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <DialogClose asChild ref={closeRef}>
                                            <Button 
                                                variant={"outline"} 
                                                type="button"
                                                className="cursor-pointer"
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            variant={"default"}
                                            type="submit"
                                            className="cursor-pointer w-20"
                                            disabled={isSubmitting}
                                        >
                                            { isSubmitting ? <div className="animate-spin">
                                                <Loader />
                                            </div>: "Save"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Name</span>
                            <span>{ form.getValues().name }</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Thumbnail Url</span>
                            {thumbnailUrl && <div className="relative w-[200px] aspect-video">
                                <Image 
                                    src={thumbnailUrl} 
                                    fill 
                                    alt="name" 
                                    className="object-cover object-center w-full h-full aspect-video" 
                                />
                            </div>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}