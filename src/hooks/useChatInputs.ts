import { FormEvent, useEffect, useState } from "react"
import useUser from "./useUser"
import { useSocketEmit } from "@/ws/hooks/useSocketEmit"
import { Chat } from "@/db/types"
import useChat from "./useChat"

export default function useChatInputs(chatId:Chat['id']) {

    const [message, setMessage] = useState("")

    const user = useUser()

    const {chat,sendMessage} = useChat(chatId)

    const emit = useSocketEmit()
    
    
    useEffect(() => {
        if (message.length > 0) {
            console.log("typing")
            emit({
                name : "typing",
                payload : {
                    chatId,
                    recipientId : chat.friend.id
                }
            })
        }
    }, [chat.friend.id , chatId , emit , message.length])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        if (!user) return ;

        e.preventDefault()

        setMessage("")

        sendMessage({
            chatId,
            content : message,
            senderId : user.id
        })
    }

    return {
        handleSubmit,
        setMessage,
        message,
    }
}
