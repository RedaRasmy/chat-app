import { FormEvent, useState } from "react";
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
                socket.emit("send-message", newMessage);
            }
        }
    }

    return {
        handleSubmit,
        setMessage,
        message
    }
}
