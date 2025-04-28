
import { getChats } from '@/app/server-actions/get'
import { useChatsStore } from '@/zustand/useChatsStore'
import useUser from './useUser'
import { useMemo } from 'react'

export default function useChats() {
    const {entities,ids,setAll,addOne} = useChatsStore()
    const user = useUser()

    const friendsIds = useMemo(()=>Object.values(entities).map(chat=>chat.friend.id),[entities])

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
        chats : useMemo(()=>ids.map(id=>entities[id]),[ids,entities]),
        friendsIds,
        entities,
        ids,
        fetchAllChats,
        addOne
    }
}