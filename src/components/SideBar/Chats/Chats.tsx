"use client";
import {  useEffect, useState } from "react";
import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { NewChatModal } from "./newChatModal";
import { FullChat } from "@/db/types";
import { getFullChats } from "@/actions";

export default function Chats() {

    // const [chats] = useState<Chat[]>(mockChats);
    const [isLoading,setIsLoading] = useState(false)
    const [chats,setChats] = useState<FullChat[]>([]);

    useEffect(()=>{
        const getUserChats = async () => {
            setIsLoading(true)
            const data = await getFullChats()
            setIsLoading(false)
            setChats(data ?? [])
        }
        console.log('getting chats ..')
        getUserChats()
    },[])

    return (
        <div className="mt-5 flex-1">
            <div className="flex items-center justify-between mb-4">
                <h1 className="pl-4 text-xl">Chats</h1>
                <NewChatModal/>
            </div>
            <span className="sr-only">new chat</span>
            {
                !isLoading ? 
                chats.map((chat) => (
                    <div key={chat.id}>
                        <ChatLabel chat={chat} />
                        <Separator className="my-2" />
                    </div>
                ))
                : <span>Loading...</span>
            }
        </div>
    );


}
