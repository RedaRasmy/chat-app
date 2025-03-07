import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";
// import { db } from "./db/drizzle";
// import { users } from "./db/schema";

export default async function middleware(req:NextRequest) {
    console.log('hello from middleware')
    console.log('nextUrl : ' ,req.nextUrl.pathname )
    if (req.nextUrl.pathname.startsWith('/api/auth/')) {
        console.log('from middleware/auth , request : ',req)
        // db.insert(users).values({
        //     username:req.
        // })
    }
    return withAuth(req);
}

export const config = {
    matcher: [
        // Run on everything but Next internals and static files
        // "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        '/',
        '/admin'
    ],
};
