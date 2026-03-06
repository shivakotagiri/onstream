export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/get-session";
import { getUserAccount } from "./actions/user";


export async function proxy(req: NextRequest) {
    const [session, userAccount] = await Promise.all([getSession(), getUserAccount()]);

    const { pathname } = req.nextUrl;
    const isAuthPage = pathname.startsWith("/auth");
    const isSettingsPage = pathname.startsWith("/settings");
    const isWelcomePage = pathname.startsWith("/welcome");

    const hasPassword = userAccount?.filter(account => account.password && account.password.length > 0)
    
    if(session && session.user) {
        if(isAuthPage && !pathname.startsWith("/auth/reset-password")) {
            return NextResponse.redirect(new URL("/", req.url));
        }  

        if(!isWelcomePage && !hasPassword && !session.user.username) {
            return NextResponse.redirect(new URL("/welcome", req.url));
        }

        if(isWelcomePage && hasPassword && session.user.username) {
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