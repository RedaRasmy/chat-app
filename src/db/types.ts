import { Prettify } from "@/lib/utility-types"
import * as s from "./zod-schemas"
import { z } from "zod"

export type SUser = z.infer<typeof s.selectUserSchema>
// export type IUser = z.infer<typeof s.insertUserSchema>

export type SChat = z.infer<typeof s.selectChatSchema>
export type IChat = z.infer<typeof s.insertChatSchema>

export type SMessage = z.infer<typeof s.selectMessageSchema>
export type IMessage = z.infer<typeof s.insertMessageSchema>


export type Chat = Prettify<Omit<SChat, 'participant1' | 'participant2'> & {
    friend : SUser
}>

export type FullChat = {
    id: SChat['id'];
    createdAt: Date;
    updatedAt: Date;
    participant1: SUser ;
    participant2: SUser;
    messages: SMessage[];
}



