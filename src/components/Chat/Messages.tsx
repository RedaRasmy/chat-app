import { useUserStore } from "@/zustand/userStore";
import ChatBubble from "./ChatBubble";
import { SMessage } from "@/db/types";
import { useEffect, useRef } from "react";
import { socket } from "@/ws/socket";
import useMutationChats from "@/hooks/useMutationChats";
import { useCurrentChatId } from "@/hooks/useCurrentChat";

export default function Messages({ messages }: { messages: SMessage[] }) {
    const userId = useUserStore((state) => state.user)?.id;
    const {addReceivedMessage} = useMutationChats()
    const addReceivedMessageRef = useRef(addReceivedMessage)
    const chatId = useCurrentChatId()
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

    useEffect(() => {
        const handleMessage = (message: SMessage) => {
            if (chatId) {
                addReceivedMessageRef.current({message,chatId})
            }
        };

        socket.on("receive-message", handleMessage);

        return () => {
            socket.off("receive-message", handleMessage); 
        };
    }, [chatId]);

    return (
        <div className="w-full overflow-y-scroll px-4 flex-1">
            {messages.map((message) => (
                <ChatBubble
                    author={message.senderId}
                    key={message.id}
                    content={message.content}
                    isUserMessage={message.senderId === userId}
                />
            ))}
            <div ref={bottomRef}></div>
        </div>
    );
}
