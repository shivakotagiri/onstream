import { updateStream } from "@/actions/stream";
import { getInfo } from "@/lib/get-session";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        }
    }).middleware(async () => {
        const data = await getInfo();
        return { user: data?.currentUser }
    }).onUploadComplete(async ({ metadata, file }) => {
        await updateStream({ userId: metadata.user?.id, thumbnailUrl: file.url });
        return { fileUrl: file.url }
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;