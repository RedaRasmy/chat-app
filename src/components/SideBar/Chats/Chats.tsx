"use client";
import { Chat } from "@/app/types/chat.type";
import React, { useState } from "react";
import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { mockChats } from "./mockChats";
import { NewChatModal } from "./newChatModal";

export default function Chats() {
    const [chats] = useState<Chat[]>(mockChats);

    return (
        <div className="mt-5 flex-1">
            <div className="flex items-center justify-between mb-4">
                <h1 className="pl-4 text-xl">Chats</h1>
                <NewChatModal/> 
            </div>
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
