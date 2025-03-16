
import { useChatsStore } from "@/zustand/chatsStore";
// import { useRef } from "react";

export default function useChatsMutation() {

    const addNewChat = useChatsStore(state=>state.addNewChat)
    const addNewMessage = useChatsStore(state=>state.addNewMessage)
    const isLoading = useChatsStore(state=>state.isLoading)
    const addReceivedMessage = useChatsStore(state=>state.addReceivedMessage)
    const seeMessages = useChatsStore(state=>state.seeMessages)
    const target = useChatsStore(state=>state.target)

    return {addNewChat,addNewMessage,isLoading,target,addReceivedMessage,seeMessages}
}
