import { Field, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

export function ServerUrl({ serverUrl }: { serverUrl: string }) {
    return (
        <Field className="w-full flex flex-row border border-neutral-500 dark:border-neutral-800 rounded-sm p-5">
            <FieldContent className="w-full flex flex-row justify-center items-center md:gap-10">
                <div className="w-fit text-nowrap sm:text-base text-sm mr-2 md:mr-0">
                    Server URL
                </div>
                <Input value={serverUrl} readOnly placeholder="Server URL" className="w-full" />
                <CopyButton value={serverUrl} />
            </FieldContent>
        </Field>
    )
}