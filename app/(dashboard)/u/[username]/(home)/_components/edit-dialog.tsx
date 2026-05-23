"use client";

import { updateUserDetails } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface EditDialogProps {
    initialBio: string
}

export function EditDailog({ initialBio }: EditDialogProps) {
    const [bio, setBio] = useState(initialBio);
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<HTMLButtonElement>(null);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        startTransition(() => {
            updateUserDetails({ bio })
                .then(() => {
                    toast.success("Bio updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant={"link"} 
                    size={"sm"} 
                    className="text-accent-foreground text-base hover:cursor-pointer"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSubmit} className="space-y-5">
                    <DialogHeader>
                        <DialogTitle>Edit user bio </DialogTitle>
                    </DialogHeader>
                    <Textarea 
                        placeholder="User bio"
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                        value={bio}
                        className="h-35 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-border"
                    />
                    <div className="flex justify-between items-center">
                        <DialogClose asChild ref={closeRef}>
                            <Button variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                            variant={"default"} 
                            type="submit" 
                            className="hover:cursor-pointer w-16"
                            disabled={isPending}
                        >
                            { isPending ? <div className="animate-spin">
                                <Loader className="w-4 h-4" />
                            </div>: "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}