'use client'
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function ChatInputs() {
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-10 p-4 flex items-center justify-center">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-md"
            />
            <button
            className="disabled:opacity-50"
            disabled={message.length === 0}
            >
                <SendHorizonal
                className="size-12 bg-green-800 rounded-full p-2
                ml-2 "
                />
            </button>
        </div>
    );
}
