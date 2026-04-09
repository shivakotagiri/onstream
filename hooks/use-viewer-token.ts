/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token"

export function useViewerToken(hostIdentity: string) {
    const [token, setToken] = useState<string>("");
    const [identity, setIdentity] = useState<string>("");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        async function createToken() {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = await jwtDecode(viewerToken) as JwtPayload & { name: string };
                const decodedName = decodedToken?.name;
                const decodedIdentity = decodedToken?.sub;

                if(decodedName) setName(decodedName);
                if(decodedIdentity) setIdentity(decodedIdentity);

            } catch (err) {
                toast.error("Something went wrong");
            }
        };

        createToken();
    }, [hostIdentity]);

    return { token, name, identity }
}