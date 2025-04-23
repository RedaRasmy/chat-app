import { check, pgTable, uuid } from "drizzle-orm/pg-core";
import users from "./users";
import { timestamps } from "@/utils/timestamps";
import { relations, sql } from "drizzle-orm";
import { messages } from "./messages";



export const chats = pgTable("chats", {
    id : uuid().primaryKey().defaultRandom() ,
    participant1 : uuid().references(()=>users.id).notNull(),
    participant2 : uuid().references(()=>users.id).notNull(),
    ...timestamps,
},  (table) => [
    check('distinct_participants', sql`${table.participant1} <> ${table.participant2}`),
    ]
);

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