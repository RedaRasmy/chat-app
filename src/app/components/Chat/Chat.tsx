'use client'
import type { Chat } from "@/app/types/chat.type";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import Messages from "./Messages";
import { SidebarTrigger, } from "@/components/ui/sidebar";



export default function Chat({chat}:{chat?:Chat}) {

    if (chat) return (
        <div className="gap-5 w-full flex flex-col h-full">
            <ChatHeader chatName={'chat.name'}/>
            <Messages/>
            <ChatInputs/>
        </div>
    )
    return (
        <div className="flex flex-col bg-zinc-900 w-full text-white h-full  ">
            <SidebarTrigger className=" m-3" />
            <h1 className="flex-1 text-center flex justify-center p-5 items-center text-5xl h-full">
                Start a Chat!
            </h1>
        </div>
    )
}
