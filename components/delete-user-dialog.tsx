import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogFooter, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";

export function DeleteUserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="shadow-none shrink-0">
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Are you sure?</DialogHeader>
                <span className="text-sm text-muted-foreground">
                    Deleting your account will remove all your data permanently. This action cannot be reversed.
                </span>
                <DialogFooter>
                    <Button variant={"destructive"}>Delete</Button>
                    <DialogClose>
                        <Button variant={"outline"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}