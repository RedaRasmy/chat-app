
import { useChatsStore } from "@/zustand/chatsStore";
// import { useRef } from "react";

export default function useChatsMutation() {

    const addNewChat = useChatsStore(state=>state.addNewChat)
    const addNewMessage = useChatsStore(state=>state.addNewMessage)
    const isLoading = useChatsStore(state=>state.isLoading)
    const addReceivedMessage = useChatsStore(state=>state.addReceivedMessage)

    return {addNewChat,addNewMessage,isLoading,addReceivedMessage}
}
