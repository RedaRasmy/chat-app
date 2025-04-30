import { getMessages } from '@/app/server-actions/get'
import { Chat } from '@/db/types'
import { useMessagesStore } from '@/zustand/useMessagesStore'

export default function useMessages() {
    const {setAll,addReceivedOne,friendSee} = useMessagesStore(state=>state)

    async function fetchAllMessages(chatsIds:Chat['id'][]) {
        const res = await getMessages(chatsIds)

        const messages = res?.data

        if (messages) {
            setAll(messages)
            return messages
        }
    }

    return {
        fetchAllMessages,
        addReceivedOne,
        friendSee
    }
}
