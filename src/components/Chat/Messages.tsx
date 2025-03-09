import { useUserStore } from "@/zustand/userStore";
import ChatBubble from "./ChatBubble";
import { SMessage } from "@/db/types";
import { useEffect, useState } from "react";
import { socket } from "@/ws/socket";

export default function Messages({ messages }: { messages: SMessage[] }) {
    const userId = useUserStore((state) => state.user)?.id;
    const [rtMessages, setMessages] = useState<SMessage[]>([]);

    useEffect(() => {
        const handleMessage = (message: SMessage) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("receive-message", handleMessage);

        return () => {
            socket.off("receive-message", handleMessage); 
        };
    }, []);

    return (
        <div className="w-full px-4 flex-1">
            {messages.map((message) => (
                <ChatBubble
                    author={message.senderId}
                    key={message.id}
                    content={message.content}
                    isUserMessage={message.senderId === userId}
                />
            ))}
            {rtMessages.map((message) => (
                <ChatBubble
                    author={message.senderId}
                    key={message.id}
                    content={message.content}
                    isUserMessage={message.senderId === userId}
                />
            ))}
        </div>
    );
}
