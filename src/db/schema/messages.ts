import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { chats } from "./chats";
import { createdAt } from "@/utils/timestamps";
import { relations } from "drizzle-orm";
import users from "./users";



export const messages = pgTable("messages", {
    id: uuid().primaryKey().defaultRandom(),
    chatId: uuid().notNull().references(()=>chats.id),
    senderId: uuid().notNull().references(()=>users.id),
    content: text().notNull(),
    seen : boolean().default(false).notNull(),
    createdAt
});


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