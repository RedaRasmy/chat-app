import { FullChat } from "@/db/types"

export const getChatName = (chat:FullChat,username:string) => {
    return chat.participant1.username === username
    ? chat.participant2.username
    : chat.participant1.username
}