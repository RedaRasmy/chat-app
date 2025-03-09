import { FullChat, SMessage } from '@/db/types'
import {create} from 'zustand'

type CurrentChatStore = {
    currentChat : FullChat | undefined,
    updateCurrentChat : (id : FullChat|undefined) => void ,
    // appendMessage : (message:SMessage) => void
}

export const useCurrentChatStore = create<CurrentChatStore>((set)=>({
    currentChat : undefined ,
    updateCurrentChat : (chat) => set({
        currentChat : chat
    }),
    // appendMessage : async (message) => set(state => ({
    //     currentChat = {
    //         ...state.currentChat,
    //         messages : [...state.currentChat?.messages,message]
    //     }
    // }))
}))

