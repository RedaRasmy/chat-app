import { z } from "zod";

const envSchema = z.object({
    NEXTAUTH_SECRET: z.string().min(1),
    MONGODB_URI: z.string().min(1),
    ADMIN_EMAIL: z.string().min(1),
});

const parsedEnv = envSchema.parse(process.env)

export default parsedEnv