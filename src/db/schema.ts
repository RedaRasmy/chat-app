
import { relations, sql } from "drizzle-orm";
import {
    text,
    pgTable,
    timestamp,
    pgEnum,
    boolean,
    uuid,
    check,
} from "drizzle-orm/pg-core";

const timestamps = {
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    // deleted_at: timestamp(),
}

export const usersRoles = ["admin", "user"] as const;
export type UserRoles = (typeof usersRoles)[number];

export const usersRolesEnum = pgEnum("users_roles", usersRoles);


export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: text().notNull(),
    email: text().notNull().unique(),
    role: usersRolesEnum().notNull().default("user"),
    ...timestamps
});

export const chats = pgTable("chats", {
    id : uuid().primaryKey().defaultRandom() ,
    participant1 : uuid().references(()=>users.id).notNull(),
    participant2 : uuid().references(()=>users.id).notNull(),
    ...timestamps,
},  (table) => [
    check('distinct_participants', sql`${table.participant1} <> ${table.participant2}`),
    ]
);

export const messages = pgTable("messages", {
    id: uuid().primaryKey().defaultRandom(),
    chatId: uuid().notNull().references(()=>chats.id),
    senderId: uuid().notNull().references(()=>users.id),
    content: text().notNull(),
    seen : boolean().default(false).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(users,({many})=>({
    chats : many(chats),
    messages : many(messages)
}))

export const messagesRelations = relations(messages,({one})=>({
    sender : one(users,{
        fields: [messages.senderId],
        references: [users.id]
    }),
    chat : one(chats,{
        fields: [messages.chatId],
        references: [chats.id]
    })
}))

export const chatsRelations = relations(chats,({many,one})=>({
    messages : many(messages),
    participant1 : one(users,{
        fields: [chats.participant1],
        references: [users.id]
    }),
    participant2 : one(users,{
        fields: [chats.participant2],
        references: [users.id]
    })
}))