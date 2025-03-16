import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
// import {drizzle as drizzle2} from 'drizzle-orm/neon-serverless'
import * as schema from "./schema";
// import ws from 'ws'

config({ path: ".env.local" });

export const db = drizzle({ 
    connection: process.env.DATABASE_URL!, schema 
});

// export const rdb = drizzle2({
//     connection: process.env.DATABASE_URL!,
//     schema,
//     ws,
// })

