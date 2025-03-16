import { useEffect, useRef, } from "react";
import { useCurrentChatId } from "./useCurrentChat";
import useUser from "./useUser";
import useChatsQuery from "./useChatsQuery";
import useSocket from "./useSocket";
import useChatsMutation from "./useChatsMutation";

export default function useChatRoom() {
    const user = useUser();
    const chatId = useCurrentChatId()
    const {socket} = useSocket()
    const {seeMessages} = useChatsMutation()
    const seeMessagesRef = useRef(seeMessages)

    useEffect(()=>{
        async function seeChat() {
            if (chatId) {
                socket.emit("send-see-chat", chatId)
                await seeMessagesRef.current({userId:user.id,chatId})
            }
        }
        seeChat()
    },[chatId,user.id,socket])
    

    const chats = useChatsQuery(); // this is a probleme render in each change on all chats
    const chat = chatId ? chats.find(chat=>chat.id === chatId) : undefined


    return {
        chatId,user,chat
    }
}
