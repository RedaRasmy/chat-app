import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import {users,messages,chats} from './schema'

// users

export const insertUserSchema = createInsertSchema(users).omit({
    createdAt : true,
    updatedAt : true,
    id: true,
})
export const selectUserSchema = createSelectSchema(users)

// messages 

export const insertMessageSchema = createInsertSchema(messages).omit({
    createdAt: true,
    id : true,
    seen : true
})
export const selectMessageSchema = createSelectSchema(messages)

// chats

export const insertChatSchema = createInsertSchema(chats).omit({
    createdAt:true,
    updatedAt: true,
    id: true
})
export const selectChatSchema = createSelectSchema(chats)