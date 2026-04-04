import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogs/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

export default function GenerateConnection() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Generate Connection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection
                    </DialogTitle>
                </DialogHeader>
                <Alert>
                    <InfoIcon />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using current connection
                    </AlertDescription>
                </Alert>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Ingress Type"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="RTMP">RTMP</SelectItem>
                            <SelectItem value="WHIP">WHIP</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DialogFooter className="w-full sm:justify-between mt-3">
                    <Button className="cursor-pointer">
                        Generate
                    </Button>
                    <DialogClose asChild>
                        <Button className="px-5 cursor-pointer py-2" variant={"secondary"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}