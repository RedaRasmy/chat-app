import { useEffect, useMemo, useRef, useState } from "react";
import useSocket from "./useSocket";
import useChatsMutation from "./useChatsMutation";
import { getFullChats, getUnseenMessages } from "@/actions";
import useUser from "./useUser";
import { useChatsStore } from "@/zustand/chatsStore";
import { useCurrentChatId } from "./useCurrentChat";
// import useChatsQuery from "./useChatsQuery";

export default function useChatApp() {
    const { socket } = useSocket();
    const { addReceivedMessage } = useChatsMutation();
    const addReceivedMessageRef = useRef(addReceivedMessage);
    const { id } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const chats = useChatsStore((state) => state.chats);
    const setChats = useChatsStore((state) => state.setChats);
    const setChatsRef = useRef(setChats);
    const chatsIds = useMemo(
        () => chats?.map((chat) => chat.id) ?? [],
        [chats]
    );
    // set chats if undefined
    const chatId = useCurrentChatId();

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


    useEffect(() => {
        socket.emit("join-chats", chatsIds);
    }, [socket, chatsIds]);

    useEffect(() => {
        
        async function getUnseen() {
            const unseenMessages = await getUnseenMessages(id);
            console.log('unsseen messages :',unseenMessages)
            for (const message of unseenMessages) {
                addReceivedMessageRef.current(message);
            }
        }
        getUnseen();
    }, [id, chatId]);

    // Listen for events

    useEffect(() => {
        console.log("receiving message ? ...(useEffect)");
        socket.on("receive-message", (message) =>
            addReceivedMessageRef.current(message, message.chatId === chatId)
        );
        return () => {
            socket.off("receive-message");
        };
    }, [socket, chatId]);

    return { isLoading };
}
