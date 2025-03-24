import { timestamps } from "@/utils/timestamps";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid , varchar } from "drizzle-orm/pg-core";
import { chats,messages } from './'

export const userRole = ["admin", "user"] as const;
export type UserRole = (typeof userRole)[number];

export const userRoleEnum = pgEnum("users_roles", userRole);

const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({length:20}).notNull().unique(),
    email: varchar({length:320}).notNull().unique(),
    role: userRoleEnum().notNull().default("user"),
    imageUrl: varchar("image_url",{length:2048}),
    ...timestamps
});
export default users

export const usersRelations = relations(users,({many})=>({
    chats : many(chats),
    messages : many(messages)
}))

