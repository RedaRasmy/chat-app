import { Chat, SChat, SUser } from "@/db/types"
import { Prettify } from "@/lib/utility-types"

export type ChatToClean = Prettify<SChat & {
    participant1 : SUser
    participant2 : SUser
}> 

/**
 *
 * @param {InputChat} chat chat to clean
 * @param {SUser['id']} userId 
 * @return {Chat} clean chat 
 */

export default function cleanChat(chat: ChatToClean , userId : SUser['id'] ):Chat {
    return {
        id : chat.id,
        createdAt : chat.createdAt,
        updatedAt : chat.updatedAt,
        friend : chat.participant1.id === userId 
            ? chat.participant2
            : chat.participant1
    }
    
}
