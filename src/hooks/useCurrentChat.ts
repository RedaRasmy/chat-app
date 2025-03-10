import { useCurrentChatStore } from "@/zustand/currentChatStore";


export function useCurrentChatId() {
    const chatId = useCurrentChatStore((state) => state.currentChatId)
    // if (!chatId) {
    //     throw new Error('No Current Chat ')
    // }    
    return chatId
}
export function useUpdateCurrentChat() {
    return useCurrentChatStore(state=>state.updateCurrentChatId)
}
