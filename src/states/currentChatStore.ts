import {create} from 'zustand'

type CurrentChatStore = {
    currentChatId : string | undefined,
    updateCurrentChat : (id : string|undefined) => void
}

export const useCurrentChatStore = create<CurrentChatStore>((set)=>({
    currentChatId : undefined ,
    updateCurrentChat : (id: string | undefined) => {
        set(() => ({
            currentChatId : id
        }))
    }
}))

