import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import {user,messages,chats} from './schema'
import { z } from "zod"

// users

// export const insertUserSchema = createInsertSchema(user).omit({
//     createdAt : true,
//     updatedAt : true,
//     id: true,
// })

export const signupSchema = z.object({
    username : z.string().min(3).max(30),
    email : z.string().email() ,
    password : z.string().min(8).max(100)
})

export const loginSchema = z.object({
    username : z.string().min(3).max(30),
    password : z.string().min(8).max(100)
})

export const selectUserSchema = createSelectSchema(user)

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