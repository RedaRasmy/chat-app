"use client";
import { Chat } from "@/app/types/chat.type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useState } from "react";
import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { mockChats } from "./mockChats";
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export default function Chats() {
    const [chats] = useState<Chat[]>(mockChats);

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-md mb-2">
                Chats
            </SidebarGroupLabel>
            <SidebarGroupAction>
                <Plus /> <span className="sr-only">new chat</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                {chats.map((chat) => (
                    <div key={chat.id}>
                        <ChatLabel chat={chat} />
                        <Separator className="my-2" />
                    </div>
                ))}
            </SidebarGroupContent>
        </SidebarGroup>
    );

    return (
        <ScrollArea>
            <div className="p-4">
                <SidebarGroupLabel className="text-md mb-2">
                    Chats
                </SidebarGroupLabel>
                {chats.map((chat) => (
                    <div key={chat.id}>
                        <ChatLabel chat={chat} />
                        <Separator className="my-2" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
