import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats";
import { createdAt } from "@/utils/timestamps";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";


export const messages = pgTable("messages", {
    id: uuid().primaryKey().defaultRandom(),
    chatId: uuid().notNull().references(()=>chats.id),
    senderId: text().notNull().references(()=>user.id),
    content: text().notNull(),
    seen : boolean().default(false).notNull(),
    createdAt
});

export const messagesRelations = relations(messages,({one})=>({
    sender : one(user,{
        fields: [messages.senderId],
        references: [user.id]
    }),
    chat : one(chats,{
        fields: [messages.chatId],
        references: [chats.id]
    })
}))