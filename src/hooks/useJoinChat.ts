import { useEffect } from "react"
import { useCurrentChatId } from "./useCurrentChat"
import useQueryChats from "./useQueryChats"
import { socket } from "@/ws/socket"
// import useMutationChats from "./useMutationChats"

export default function useJoinChat() {
    const chatId = useCurrentChatId()
    const {getFullChatById,isLoading} = useQueryChats()
    // const {} = useMutationChats()
    const chat = chatId ?  getFullChatById(chatId) : undefined

    console.log("is Loading : ",isLoading)
    useEffect(()=>{
        socket.emit('join-chat',chatId)
    },[chatId])

    return {chat,isLoading}
}
