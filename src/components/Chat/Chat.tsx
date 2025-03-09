'use client'
import type { Chat } from "@/app/types/chat.type";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import Messages from "./Messages";
import { cn } from "@/lib/utils";
import { FullChat } from "@/db/types";
import { getChatName } from "@/utils/getChatName";
import { useUserStore } from "@/zustand/userStore";
import { useEffect } from "react";
import { socket } from "@/ws/socket";
import { useCurrentChatStore } from "@/zustand/currentChatStore";

export default function Chat({chat}:{
    chat : FullChat | undefined
}) {
    const chatId = useCurrentChatStore(state=>state.currentChat?.id)
    useEffect(()=>{
        if (chatId) {
            socket.emit('join-chat',chatId)
        }
    },[chatId])

    const username = useUserStore(state=>state.user)?.username

    if (chat && username) return (
        <div className={cn("gap-5 flex flex-col w-full h-full")}>
            <ChatHeader chatName={getChatName(chat,username ?? '')}/>
            <Messages messages={chat.messages}/>
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
