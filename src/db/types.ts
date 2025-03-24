import { getFullChats } from '@/actions'
import * as s from './zod-schemas'
import { z } from 'zod'


export type SUser = z.infer<typeof s.selectUserSchema>
export type IUser = z.infer<typeof s.insertUserSchema>

export type SChat = z.infer<typeof s.selectChatSchema>
export type IChat = z.infer<typeof s.insertChatSchema>

export type SMessage = z.infer<typeof s.selectMessageSchema>
export type IMessage = z.infer<typeof s.insertMessageSchema>

export type FullChat = Exclude<Awaited<ReturnType<typeof getFullChats>>,undefined>[number]