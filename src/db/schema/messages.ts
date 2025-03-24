import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users , chats } from "./"
import { createdAt } from "@/utils/timestamps";
import { relations } from "drizzle-orm";


const messages = pgTable("messages", {
    id: uuid().primaryKey().defaultRandom(),
    chatId: uuid().notNull().references(()=>chats.id),
    senderId: uuid().notNull().references(()=>users.id),
    content: varchar({length:1000}).notNull(),
    seen : boolean().default(false).notNull(),
    seenAt: timestamp("seen_at") ,
    delivredAt : timestamp("delivred_at"),
    createdAt
});

export default messages

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