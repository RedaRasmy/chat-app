'use client'
import { Chat } from "@/app/types/chat.type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useState } from "react";
import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { mockChats } from "./mockChats";

export default function Chats() {
    const [chats, ] = useState<Chat[]>(mockChats);

    return (
        <ScrollArea>
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Chats</h4>
                {chats.map((chat) => (
                    <div key={chat.id}>
                        <ChatLabel
                            chat={chat}
                        />
                        <Separator className="my-2" />
                    </div>
                ))}
            </div> 
        </ScrollArea>
    );
}
