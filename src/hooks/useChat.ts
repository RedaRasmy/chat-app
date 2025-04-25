import { Chat, IMessage} from "@/db/types";
import { useChatsStore } from "@/zustand/useChatsStore";
import { useMessagesStore } from "@/zustand/useMessagesStore";
import useUser from "./useUser";
import { useSocketEmit } from "@/ws/hooks/useSocketEmit";
import useIsTyping from "./useIsTyping";


export default function useChat(chatId : Chat['id']) {
    
    const chat = useChatsStore(state=>state.entities[chatId])
    const {entities, see , addOne } = useMessagesStore()
    const emit = useSocketEmit()
    
    const user = useUser()
    
    const messages = Object.values(entities).filter(message=>message.chatId === chatId)
    
    async function seeChat() {
        if (user) {
            await see({chatId,userId: user.id})
            emit({
                name : 'see',
                payload : {
                    recipientId : chat.friend.id,
                    chatId
                }
            })
        }
    }
    
    async function sendMessage(message:IMessage) {
        const newMessage = await addOne(message)
        if (newMessage) {
            emit({
                name : 'message',
                payload : {
                    message : newMessage,
                    recipientId : chat.friend.id
                }
            })
        }
    }

    const isTyping = useIsTyping(chatId)

    return {
        chat,
        messages,
        seeChat,
        sendMessage,
        isTyping
    }
}
