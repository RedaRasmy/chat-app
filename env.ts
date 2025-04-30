import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    emptyStringAsUndefined: true,

    server: {
        DATABASE_URL: z.string().url(),
        BETTER_AUTH_SECRET: z.string().min(1),
        RESEND_API_KEY : z.string().min(1),
        ADMIN_EMAIL : z.string().email()
        // GITHUB_CLIENT_SECRET: z.string().min(1),
        // GITHUB_CLIENT_ID: z.string().min(1),
        // GOOGLE_CLIENT_ID : z.string().min(1),
        // GOOGLE_CLIENT_SECRET : z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().url(),
        // NEXT_PUBLIC_POSTHOG_KEY : z.string().min(1),
        // NEXT_PUBLIC_POSTHOG_HOST : z.string().min(1)
    },
    experimental__runtimeEnv: {
        ...process.env,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        // NEXT_PUBLIC_POSTHOG_KEY : process.env.NEXT_PUBLIC_POSTHOG_KEY,
        // NEXT_PUBLIC_POSTHOG_HOST : process.env.NEXT_PUBLIC_POSTHOG_HOST
    },
})