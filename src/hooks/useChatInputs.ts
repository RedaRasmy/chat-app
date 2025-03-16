import { FormEvent, useEffect, useState } from "react";
import useSocket from "./useSocket";
import { useCurrentChatId } from "./useCurrentChat";
import useUser from "./useUser";
import useChatsMutation from "./useChatsMutation";

export default function useChatInputs() {
    const { socket,  } = useSocket();
    const [message, setMessage] = useState("");
    const { id: userId } = useUser();
    const chatId = useCurrentChatId()

    const { addNewMessage } = useChatsMutation();

    useEffect(()=>{
        if (message.length > 0) {
            console.log('typing')
            socket.emit('send-typing',chatId)
        }
    },[message.length,socket,chatId])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");
        if (chatId) {
            const newMessage = await addNewMessage({
                chatId,
                content: message,
                userId,
            })
            if (newMessage) {
                socket.emit("send-message", newMessage , (response:{status:'ok'|'not ok'})=> {
                    if (response.status === 'ok') {
                        // handle success (message sended to server)
                    } else {
                        // handle failure (server didnt get the message)
                    }
                });
            }
        }
    }

    return {
        handleSubmit,
        setMessage,
        message
    }
}
