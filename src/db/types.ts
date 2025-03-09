import { getFullChats } from '@/actions'
import * as s from './schema'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export type SUser = InferSelectModel<typeof s.users>
export type IUser = InferInsertModel<typeof s.users>

export type SChat = InferSelectModel<typeof s.chats>
export type IChat = Omit<InferInsertModel<typeof s.chats>,'participant1'>
export type FullChat = Exclude<Awaited<ReturnType<typeof getFullChats>>,undefined>[number]

export type SMessage = InferSelectModel<typeof s.messages>
export type IMessage = InferInsertModel<typeof s.messages>


