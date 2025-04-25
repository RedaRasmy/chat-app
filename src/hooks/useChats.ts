
import { getChats } from '@/app/server-actions/get'
import { useChatsStore } from '@/zustand/useChatsStore'
import useUser from './useUser'

export default function useChats() {
    const {entities,ids,setAll,addOne} = useChatsStore()
    const user = useUser()

    async function fetchAllChats() {
        if (user) {
            const res = await getChats(user.id)

            const chats = res?.data

            if (chats) {
                setAll(chats)
                return chats
            }
        }
    }

    return {
        chats : ids.map(id=>entities[id]),
        entities,
        ids,
        fetchAllChats,
        addOne
    }
}