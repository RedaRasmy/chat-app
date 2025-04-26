import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js"
import { username } from "better-auth/plugins"
import { account, session, user, verification } from "@/db/schema";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema : {
            /// put auth tables here
            user,
            session,
            account,
            verification
        }
    }),
    emailAndPassword: {
        enabled: true,
        // async sendResetPassword(data, request) {
        //     // Send an email to the user with a link to reset their password
        // },
    },
    
    // make sure nextCookies is the last plugin in the array
    plugins: [
        username(),
        nextCookies()
    ] ,
    session : {
        cookieCache : {
            enabled : true,
            maxAge : 60 * 5
            // maxAge : 60 * 60 * 24
        }
    }
})

