"use client";
import { Chat } from "@/app/types/chat.type";
import React, { useState } from "react";
import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { mockChats } from "./mockChats";
import { Plus } from "lucide-react";

export default function Chats() {
    const [chats] = useState<Chat[]>(mockChats);

    return (
        <div>
            <h1>Chats</h1>
            <Plus /> 
            <span className="sr-only">new chat</span>
            {chats.map((chat) => (
                <div key={chat.id}>
                    <ChatLabel chat={chat} />
                    <Separator className="my-2" />
                </div>
            ))}
        </div>
    );


}
