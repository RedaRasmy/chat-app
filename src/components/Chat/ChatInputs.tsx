"use client";
import { SendHorizonal } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";

import { useCurrentChatStore } from "@/zustand/currentChatStore";
import { useUserStore } from "@/zustand/userStore";
import { socket } from "@/ws/socket";
import { addMessage } from "@/actions";

export default function ChatInputs() {
    const [message, setMessage] = useState("");
    const chatId = useCurrentChatStore((state) => state.currentChat)?.id;
    const senderId = useUserStore((state) => state.user)?.id;

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("send message");
        if (chatId && senderId) {
            const newMessage = await addMessage(senderId,chatId,message)
            socket.emit("send-message", newMessage );
        }
        setMessage('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-10 p-4 gap-4 flex items-center justify-center"
        >
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Write a message..."
                className="input focus:bg-gray-400 !text-black input- input-ghost w-full max-w-md"
            />
            <Button
                className="disabled:opacity-50 rounded-full bg-gray-400 "
                variant={"ghost"}
                size={"icon"}
                disabled={message.length === 0}
            >
                <SendHorizonal />
            </Button>
        </form>
    );
}
