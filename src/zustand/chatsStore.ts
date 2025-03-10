import { addChat, addMessage } from "@/actions";
import { FullChat, SChat, SMessage } from "@/db/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ChatsState = {
    chats: FullChat[] | undefined;
    isLoading: boolean;
};

type ChatsActions = {
    setChats: (chats: FullChat[]) => void;
    addNewChat: (participant2: string) => Promise<SChat|undefined>;
    addNewMessage: ( {chatId,content,userId}:
        {
            chatId: string,
            userId: string,
            content: string
        }
    ) => Promise<SMessage | undefined>;
    addReceivedMessage: ({message,chatId}:{
        message : SMessage,
        chatId : string
    }) => void
};

export const useChatsStore = create<ChatsState & ChatsActions>()(
    immer((set) => ({
        chats: undefined,
        isLoading: false,
        setChats: (chats) =>
            set({
                chats,
            }),
        addNewChat: async (participant2) => {
            set({ isLoading: true });
            try {
                const newChat = await addChat(participant2);
                set({ isLoading: false });
                if (newChat) {
                    set((state) => ({
                        chats: state.chats ? [...state.chats, newChat] : [newChat],
                    }));
                    return newChat
                }
            } catch (error) {
                console.error("Failed to add new chat : ", error);
            } finally {
                set({ isLoading: false });
            }
        },
        addNewMessage: async ({chatId, userId, content}) => {
            try {
                set({ isLoading: true });
                const newMessage = await addMessage({userId, chatId, content});
                set({ isLoading: false });
                set(state => {
                    const chat = state.chats?.find(chat=>chat.id===chatId)
                    if (chat) {
                        chat.messages.push(newMessage)
                    }
                })
                return newMessage
            } catch (error) {
                console.error("Failed to add new Message : ", error);
            } finally {
                set({ isLoading: false });
            }
        },
        addReceivedMessage : ({message,chatId}) => {
            set((state)=>{
                const chat = state.chats?.find(chat=>chat.id === chatId)
                if (chat) {
                    chat.messages.push(message)
                }
            })
        }
    }))
);
