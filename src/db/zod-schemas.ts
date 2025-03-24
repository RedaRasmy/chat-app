import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { users, chats, messages } from "./schema"

export const selectUserSchema = createSelectSchema(users)
export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    role: true
})

export const selectChatSchema = createSelectSchema(chats)
export const insertChatSchema = createInsertSchema(chats).omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export const selectMessageSchema = createSelectSchema(messages)
export const insertMessageSchema = createInsertSchema(messages).omit({
    id: true,
    createdAt: true,
    
})
