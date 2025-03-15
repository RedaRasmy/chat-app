
import ChatBubble from "./ChatBubble";
import { SMessage } from "@/db/types";
import { useEffect, useRef, } from "react";
import useUser from "@/hooks/useUser";
import getMessageDate from "@/utils/getMessageDate";
import TypingActivity from "./TypingActivity";

export default function Messages({ messages }: { messages: SMessage[] }) {
    const {id} = useUser()
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="w-full overflow-y-scroll px-4 flex-1 ">
            {messages.map((message) => (
                <ChatBubble
                    author={message.senderId}
                    key={message.id}
                    content={message.content}
                    isUserMessage={message.senderId === id}
                    time={getMessageDate(message.createdAt)}
                />
            ))}
            <div ref={bottomRef}></div>
            <TypingActivity/>
        </div>
    );
}
