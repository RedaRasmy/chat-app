import { check, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "@/utils/timestamps";
import { relations, sql } from "drizzle-orm";
import { messages } from "./messages";
import { user } from "./auth-schema";


export const chats = pgTable("chats", {
    id : uuid().primaryKey().defaultRandom() ,
    participant1 : text().references(()=>user.id).notNull(),
    participant2 : text().references(()=>user.id).notNull(),
    ...timestamps,
},  (table) => [
    check('distinct_participants', sql`${table.participant1} <> ${table.participant2}`),
    ]
);

export const chatsRelations = relations(chats,({many,one})=>({
    messages : many(messages),
    participant1 : one(user,{
        fields: [chats.participant1],
        references: [user.id]
    }),
    participant2 : one(user,{
        fields: [chats.participant2],
        references: [user.id]
    })
}))