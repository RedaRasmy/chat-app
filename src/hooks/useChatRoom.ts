import { useEffect, } from "react";
import { useCurrentChatId } from "./useCurrentChat";
import useUser from "./useUser";
import { seeChat } from "@/actions";
import useChatsQuery from "./useChatsQuery";
import useSocket from "./useSocket";

export default function useChatRoom() {
    const user = useUser();
    const chatId = useCurrentChatId()
    const {socket} = useSocket()

    useEffect(()=>{
        async function seeMessages() {
            if (chatId) {
                await seeChat(user.id,chatId)
            }
        }
        seeMessages()
    },[chatId,user.id])
    

    const chats = useChatsQuery(); // this is a probleme render in each change on all chats
    const chat = chatId ? chats.find(chat=>chat.id === chatId) : undefined

    
    useEffect(() => {
        if (chatId) {
            socket.emit("join-chat", chatId)
        }
    }, [chatId,socket]);

    return {
        chatId,user,chat
    }
}
