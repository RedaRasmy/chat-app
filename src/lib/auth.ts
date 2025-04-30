import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js"
import { username } from "better-auth/plugins"
import { account, session, user, verification } from "@/db/schema";
import resend from "./resend";
import { env } from "../../env";
import VerifyEmail from "@/emails/verify-email";


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
        requireEmailVerification : true
        // async sendResetPassword(data, request) {
        //     // Send an email to the user with a link to reset their password
        // },
    },
    emailVerification : {
        sendVerificationEmail : async ({user,url,}) => {
            await resend.emails.send({
                from: "chat-app <onboarding@resend.dev>", // to change (domain)
                to : [env.ADMIN_EMAIL], // to change to user.email
                subject: "Verify your email address",
                react: VerifyEmail({username:user.name,url}),
            })
        },
        autoSignInAfterVerification : true
    },
    // make sure nextCookies is the last plugin in the array
    plugins: [
        username(),
        nextCookies()
    ] ,
    session : {
        freshAge : 0 , // for simplicity currently 
        cookieCache : {
            enabled : true,
            maxAge : 60 * 5
        }
    }
})

