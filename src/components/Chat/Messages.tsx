
import ChatBubble from "./ChatBubble";
import { SMessage } from "@/db/types";
import { useEffect, useRef } from "react";
import useUser from "@/hooks/useUser";
import getMessageDate from "@/utils/getMessageDate";

export default function Messages({ messages }: { messages: SMessage[] }) {
    const {id} = useUser()
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="w-full overflow-y-scroll px-4 flex-1">
            {messages.map((message) => (
                <ChatBubble
                    author={message.senderId}
                    key={message.id}
                    content={message.content}
                    isUserMessage={message.senderId === id}
                    time={getMessageDate(message.createdAt)}
                />
            ))}
            {true && <div className="flex my-4 -mb-5 items-center gap-1 font-semibold">typing<span className="loading-dots -mb-2 loading-sm loading"/></div>}
            <div ref={bottomRef}></div>
        </div>
    );
}
