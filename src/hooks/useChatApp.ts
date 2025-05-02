import { useEffect} from "react"
import useChats from "./useChats"
import useMessages from "./useMessages"
import { useSocketEvents } from "@/ws/hooks/useSocketEvents"
import { useSocketEmit } from "@/ws/hooks/useSocketEmit"
import useUser from "./useUser"
// import { useCurrentChatId } from "./useCurrentChat"

export default function useChatApp() {
    ///////////////////////////
    // this hook should be called only in ChatApp component
    ///////////////////////

    const user = useUser()

    // Register User 

    const emit = useSocketEmit()

    useEffect(()=>{
        if (!user) return;
        emit({
            name : 'register',
            payload : {
                userId : user.id
            }
        })
    },[user,emit])

    /// Fetch data

    const {fetchAllChats,ids:chatsIds,addOne:addOneChat} = useChats()
    const {fetchAllMessages,addReceivedOne,friendSee} = useMessages()

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
                if (!chatsIds.includes(message.chatId) && user) {
                    await addOneChat({
                        participant1 : user.id,
                        participant2 : message.senderId
                    })
                }
                
            }
        },
        {
            name : 'see' ,
            handler : (chatId) => {
                if (user) friendSee({
                    userId : user.id , 
                    chatId
                })
            }
        }
    ])

}
