"use client";

import { updateStream } from "@/actions/stream";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
    const form = useForm({
        defaultValues: {
            name: initialName,
            thumbnailUrl: initialThumbnailUrl || ""
        },
        resolver: zodResolver(InfoCardSchema)
    });

    async function handleStreamInfoUpdate(data: InfoCardType) {
        const res = await updateStream({ id: hostIdentity, name: data.name, thumbnailUrl: data.thumbnailUrl });
        if(!res || res.length == 0) {
            toast.error("Something went wrong");
        } else {
            toast.success("Stream info updated");
        }
        return res;
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
                                size={"lg"}
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
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField 
                                        control={form.control}
                                        name="thumbnailUrl"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Thumbnail URL</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="text"
                                                        placeholder="Please enter your stream's thumbnail url"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                                <div className="flex justify-between">
                                    <DialogClose asChild>
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
                                        className="cursor-pointer"
                                    >
                                        Save
                                    </Button>
                                </div>
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
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Thumbnail Url</span>
                            <span>{ form.getValues().thumbnailUrl }</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}