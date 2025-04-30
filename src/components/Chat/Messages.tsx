
import ChatBubble from "./ChatBubble";
import { SMessage } from "@/db/types";
import { useEffect, useRef, } from "react";
import TypingActivity from "./TypingActivity";

export default function Messages({ messages }: { messages: SMessage[] }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="w-full flex overflow-y-auto flex-col px-4 flex-1 ">
            <div className="flex-1 ">
                {messages.map((message) => (
                    <ChatBubble
                        key={message.id}
                        isPending={false}
                        message={message}
                    />
                ))}
            </div>
            <div ref={bottomRef} className=""><TypingActivity/></div>
            
        </div>
    );
}
