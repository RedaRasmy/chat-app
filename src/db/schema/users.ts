import {  text, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '@/utils/timestamps';
import { chats } from './chats';
import { messages } from './messages';


export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: text().notNull(),
    email: text().notNull().unique(),
    ...timestamps
});


export const usersRelations = relations(users,({many})=>({
    chats : many(chats),
    messages : many(messages)
}))