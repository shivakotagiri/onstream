import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialogs/dialog"
import { Button } from "@/components/ui/button"
import { BetterAuthActionButton } from "../better-auth-action-button"; 
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DeleteUserDialog() {
    const router = useRouter();
    async function handleDelete() {
        const res = await authClient.deleteUser({
            callbackURL: "/",
        });

        if(res.error) {
            return { error: { message: res.error.message } }
        } else {
            toast.success("User deleted Successfull");
            router.refresh();
            return { error: null }
        }
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="shadow-none shrink-0">
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <span className="text-sm text-muted-foreground">
                    Deleting your account will remove all your data permanently. This action cannot be reversed.
                </span>
                <DialogFooter>
                    <BetterAuthActionButton action={handleDelete}>
                        Delete
                    </BetterAuthActionButton>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}