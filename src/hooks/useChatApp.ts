import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import useChatsMutation from "./useChatsMutation";
import { getFullChats, getUnseenMessages } from "@/actions";
import useUser from "./useUser";
import { useChatsStore } from "@/zustand/chatsStore";
// import useChatsQuery from "./useChatsQuery";

export default function useChatApp() {
    const { socket, connect, disconnect } = useSocket();
    const { addReceivedMessage } = useChatsMutation();
    const addReceivedMessageRef = useRef(addReceivedMessage);
    const { id } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const chats = useChatsStore((state) => state.chats);
    const setChats = useChatsStore((state) => state.setChats);
    const setChatsRef = useRef(setChats)
    
    // set chats if undefined 

    useEffect(() => {
        const getUserChats = async () => {
            try {
                if (chats === undefined) {
                    setIsLoading(true);
                    const data = await getFullChats(id);
                    setChatsRef.current(data);
                }
            } catch (error) {
                console.error(
                    "Failed to get chats (from useChatApp) : ",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };
        getUserChats();
    }, [chats, id]);

    // Connection

    useEffect(() => {
        if (!socket.connected) {
            connect();
        }
        return () => disconnect();
    }, [connect, socket.connected, disconnect]);

    useEffect(() => {
        async function getUnseen() {
            const unseenMessages = await getUnseenMessages(id);
            for (const message of unseenMessages) {
                addReceivedMessageRef.current(message);
            }
        }
        getUnseen();
    }, [id]);

    // Listen for events

    useEffect(() => {
        console.log("receiving message ? ...(useEffect)");
        // console.log('socket is connected :',socket.connected)
        // if (socket.connected) {
            // console.log('ws connected')
        socket.on("receive-message", addReceivedMessageRef.current);
        // }
        return () => {socket.off('receive-message')}
    }, [socket]);

    return {isLoading}
}
