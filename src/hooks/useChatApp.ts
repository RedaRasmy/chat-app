import { useEffect} from "react"
import useUser from "./useUser"
import useChats from "./useChats"
import useMessages from "./useMessages"
import { useSocketEvents } from "@/ws/hooks/useSocketEvents"

export default function useChatApp() {
    // should be called only in ChatApp component
    const user = useUser()

    /// Fetch data

    const {fetchAllChats,ids:chatsIds,addOne:addOneChat} = useChats()
    const {fetchAllMessages,addReceivedOne} = useMessages()

    useEffect(()=>{
        async function fetchAll() {
            const chats = await fetchAllChats()
            if (chats) {
                await fetchAllMessages(chats.map(chat=>chat.id))
            }
        }
        fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // Listen for events

    useSocketEvents([
        {
            name : 'message' ,
            handler : async (message) => {
                addReceivedOne(message)
                // check if the message from new chat and fetch it if true
                if (!chatsIds.includes(message.id) && user) {
                    await addOneChat({
                        participant1 : user.id,
                        participant2 : message.senderId
                    })
                }
                
            }
        }
    ])

}
