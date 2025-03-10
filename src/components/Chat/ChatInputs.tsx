"use client";
import { SendHorizonal } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { socket } from "@/ws/socket";
import useUser from "@/hooks/useUser";
import { useCurrentChatId } from "@/hooks/useCurrentChat";
import useMutationChats from "@/hooks/useMutationChats";

export default function ChatInputs() {
    const [message, setMessage] = useState("");
    const {id:userId} = useUser();
    
    const chatId = useCurrentChatId();
    const { addNewMessage } = useMutationChats();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newMessage = chatId && await addNewMessage({
            chatId,
            content: message,
            userId,
        });
        if (newMessage) {
            socket.emit("send-message", newMessage);
        }
        setMessage("");
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
