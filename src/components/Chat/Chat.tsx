'use client'
import type { Chat } from "@/app/types/chat.type";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import Messages from "./Messages";
import { mockChats } from "../SideBar/Chats/mockChats";
import { cn } from "@/lib/utils";

export default function Chat({chatId}:{
    chatId : string | undefined
}) {
    // fetch chat by id
    const chat = mockChats.filter(chat=>chat.id === chatId)[0]

    if (chat) return (
        <div className={cn("gap-5 flex flex-col w-full h-full")}>
            <ChatHeader chatName={chat.name}/>
            <Messages/>
            <ChatInputs/>
        </div>
    )
    return (
        <div className="flex md:flex flex-col bg-zinc-900 w-full text-white h-full  ">
            <h1 className="flex-1 text-center flex justify-center p-5 items-center text-5xl h-full">
                Start a Chat!
            </h1>
        </div>
    )
}
