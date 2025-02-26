import { uuid, text, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    username: varchar("username", { length: 30 }).notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const chats = pgTable("chats", {
    id: uuid("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
    id: uuid("id").primaryKey(),
    chatId: uuid("chat_id")
        .references(() => chats.id)
        .notNull(),
    senderId: uuid("sender_id")
        .references(() => users.id)
        .notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const participants = pgTable("participants", {
    id: uuid("id").primaryKey(),
    chatId: uuid("chat_id")
        .references(() => chats.id)
        .notNull(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    joinedAt: timestamp("joined_at").defaultNow(),
});
