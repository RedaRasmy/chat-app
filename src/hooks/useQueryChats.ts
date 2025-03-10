import { getFullChats } from "@/actions";
import { useChatsStore } from "@/zustand/chatsStore";
import { useEffect, useRef, useState } from "react";

export default function useQueryChats() {
    const chats = useChatsStore(state=>state.chats)
    const setChats = useChatsStore(state=>state.setChats)
    const setChatsRef = useRef(setChats)
    const [isLoading , setIsLoading] = useState(false)


    useEffect(() => {
        const getUserChats = async () => {
            try {
                if (chats === undefined) {
                    setIsLoading(true)
                    const data = await getFullChats();
                    setChatsRef.current(data ?? []);
                }
            } catch (error) {
                console.error("Failed to get chats (from useQueryChats) : ",error);
            } finally {
                setIsLoading(false)
            }
        };
        console.log("getting chats ..");
        getUserChats();
    }, [chats]);

    function getFullChatById(id:string) {
        return chats?.find(chat => chat.id === id)
    }


    return {chats,isLoading,getFullChatById}
}
