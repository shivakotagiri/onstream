export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/get-session";


export async function proxy(req: NextRequest) {
    const session = await getSession();

    const { pathname } = req.nextUrl;
    const isAuthPage = pathname.startsWith("/auth");
    const isSettingsPage = pathname.startsWith("/settings");
    const isWelcomePage = pathname.startsWith("/welcome");

    const hasUsername = Boolean(session?.user.username);
    
    if(session && session.user) {
        

        if(!hasUsername && !isWelcomePage) {
            return NextResponse.redirect(new URL("/welcome", req.url));
        }

        if(isWelcomePage && hasUsername) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if(isAuthPage && !pathname.startsWith("/auth/reset-password")) {
            return NextResponse.redirect(new URL("/", req.url));
        }  

    } else {
        if(isSettingsPage) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        } else if(isWelcomePage) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/auth/:path*", "/settings", "/welcome"],
}