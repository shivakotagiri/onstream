import { updateStream } from "@/actions/stream";
import { getCurrentUser } from "@/actions/user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        }
    }).middleware(async () => {
        const currentUser = await getCurrentUser();
        return { user: currentUser }
    }).onUploadComplete(async ({ metadata, file }) => {
        await updateStream({ userId: metadata.user?.id, thumbnailUrl: file.url });
        return { fileUrl: file.url }
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;