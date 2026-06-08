"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/dropzone";
import { SpinnerIcon } from "@livekit/components-react";
import { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialogs/dialog";

import { updateProfilePic } from "@/actions/user";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

export function PfpDropboxDialog() {
    const [files, setFiles] = useState<File[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const { startUpload, isUploading } = useUploadThing("ProfileUploader", {
        onClientUploadComplete: async (res) => {
            const fileUpload = res[0];
            if(fileUpload) {
                try {
                    await updateProfilePic(fileUpload.url);
                    setOpen(false);
                    toast.success("Profile pic updated");
                    router.refresh();
                } catch(error) {
                    toast.error("Failed to save profile pic");
                    console.error(error);
                }
            }
            setFiles([]);
        },
        onUploadError: (error) => {
            toast.error("Failed to upload profile pic");
            console.error(error);
        }
    });

    async function handleDrop(acceptedFiles: File[]) {
        setFiles(acceptedFiles);
        if(acceptedFiles.length > 0) {
            await startUpload(acceptedFiles);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="sm:w-full w-[85%] rounded-full bg-transparent border-input text-foreground hover:bg-accent hover:text-accent-foreground h-9 px-4 text-xs font-normal shadow-none">
                    Upload profile pic
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Upload profile pic
                    </DialogTitle>
                </DialogHeader>
                <Dropzone
                    src={files}
                    onDrop={handleDrop}
                    accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif"] }}
                    maxSize={4 * 1024 * 1024}
                    disabled={isUploading}
                    className="w-full max-w-md"
                >
                    {isUploading ? (<div className="flex flex-col gap-2 justify-content items-center p-6 text-muted-foreground text-sm">
                        <span className="animate-spin"><SpinnerIcon /></span>
                        <span>Uploading & saving profile pic...</span>
                    </div>): (
                        <>
                            <DropzoneContent />
                            <DropzoneEmptyState />
                        </>
                    )}
                </Dropzone>
            </DialogContent>
        </Dialog>
    )
}