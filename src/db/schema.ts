import { uuid, text, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoles = ['admin','user'] as const
export const participantsRoles = ['super','admin','user'] as const

export type UserRole = typeof userRoles[number]
export type ParticipantRole = typeof participantsRoles[number]

export const userRoleEnum = pgEnum('user_roles',userRoles)
export const participantsRoleEnum = pgEnum('participants_roles',participantsRoles)

export const users = pgTable("users", {
    id: uuid().primaryKey(),
    username: varchar({ length: 30 }).notNull().unique(),
    email : text().notNull().unique(),
    password: text().notNull(),
    salt : text().notNull(),
    role : userRoleEnum().notNull().default('user') ,
    createdAt: timestamp().defaultNow().notNull() ,
    updatedAt : timestamp().defaultNow().$onUpdate(()=>new Date).notNull()
});


export const chats = pgTable("chats", {
    id: uuid().primaryKey(),
    name: varchar( { length: 50 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt : timestamp().defaultNow().$onUpdate(()=>new Date).notNull()
});

export const messages = pgTable("messages", {
    id: uuid().primaryKey(),
    chatId: uuid()
        .references(() => chats.id)
        .notNull(),
    senderId: uuid()
        .references(() => users.id)
        .notNull(),
    content: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt : timestamp().defaultNow().$onUpdate(()=>new Date).notNull()
});

export const participants = pgTable("participants", {
    id: uuid().primaryKey(),
    chatId: uuid()
        .references(() => chats.id)
        .notNull(),
    userId: uuid()
        .references(() => users.id)
        .notNull(),
    chatRole : participantsRoleEnum().notNull().default('user'),
    joinedAt: timestamp().defaultNow().notNull(),
});
