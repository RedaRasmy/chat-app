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
                socket.emit("join-chat", chatId)
                await seeMessagesRef.current({userId:user.id,chatId})
            }
        }
        seeChat()
    },[chatId,user.id,socket])
    

    const chats = useChatsQuery(); // this is a probleme render in each change on all chats
    const chat = chatId ? chats.find(chat=>chat.id === chatId) : undefined

    
    useEffect(() => {
        async function seeMessage() {
            if (chatId) {
                await seeMessagesRef.current({userId:user.id,chatId})
            }
        }
        if (chatId) {
            socket.on("receive-message", seeMessage )
        }
        return () => {socket.off('receive-message')}
    }, [chatId,socket,user.id]);

    return {
        chatId,user,chat
    }
}
