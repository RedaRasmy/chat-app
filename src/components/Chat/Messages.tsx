
import ChatBubble from "./ChatBubble";
import { SMessage } from "@/db/types";
import { useEffect, useRef, } from "react";
import useUser from "@/hooks/useUser";
import getMessageDate from "@/utils/getMessageDate";
import TypingActivity from "./TypingActivity";

export default function Messages({ messages }: { messages: SMessage[] }) {
    const user = useUser()
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="w-full flex overflow-y-auto flex-col px-4 flex-1 ">
            <div className="flex-1 ">
                {messages.map((message) => (
                    <ChatBubble
                        author={message.senderId}
                        key={message.id}
                        content={message.content}
                        isUserMessage={message.senderId === user?.id}
                        time={getMessageDate(message.createdAt)}
                    />
                ))}
            </div>
            <div ref={bottomRef} className=""><TypingActivity/></div>
            
        </div>
    );
}
