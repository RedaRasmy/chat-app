import { useEffect, useRef } from "react";
import useSocket from "./useSocket";
import useChatsMutation from "./useChatsMutation";
import { getUnseenMessages } from "@/actions";
import useUser from "./useUser";
// import useChatsQuery from "./useChatsQuery";

export default function useChatApp() {
    const { socket, connect, disconnect } = useSocket();
    const { addReceivedMessage } = useChatsMutation();
    const addReceivedMessageRef = useRef(addReceivedMessage);
    const {id} = useUser()
    
    // Connection

    useEffect(() => {
        if (!socket.connected) {
            connect()
        }
        return () => disconnect()
    }, [connect,socket.connected,disconnect] );

    useEffect(()=>{
        async function getUnseen() {
            const unseenMessages = await getUnseenMessages(id)
            for (const message of unseenMessages) {
                addReceivedMessageRef.current(message)
            }
        }
        getUnseen()
    },[id])


    // Listen for events

    useEffect(()=>{
        console.log('useEffect runs')
        if (socket.connected) {
            socket.on("receive-message", addReceivedMessageRef.current )
        }
    },[socket])


}
