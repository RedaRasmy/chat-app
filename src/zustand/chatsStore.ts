import { addChat, addMessage } from "@/actions";
import { FullChat } from "@/db/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ChatsState = {
    chats: FullChat[];
    isLoading: boolean;
};

type ChatsActions = {
    setChats: (chats: FullChat[]) => void;
    addNewChat: (participant2: string) => Promise<void>;
    addNewMessage: (
        chatId: string,
        userId: string,
        content: string
    ) => Promise<void>;
};

export const useChatsStore = create<ChatsState & ChatsActions>()(
    immer((set) => ({
        chats: [],
        isLoading: false,
        setChats: (chats) =>
            set({
                chats,
            }),
        addNewChat: async (participant2) => {
            set({ isLoading: true });
            try {
                const newChat = await addChat(participant2);
                if (newChat) {
                    set((state) => ({
                        chats: [...state.chats, newChat],
                    }));
                }
            } catch (error) {
                console.error("Failed to add new chat : ", error);
            } finally {
                set({ isLoading: false });
            }
        },
        addNewMessage: async (chatId, userId, content) => {
            set({ isLoading: true });
            try {
                const newMessage = await addMessage(userId, chatId, content);
                set(state => {
                    const chat = state.chats.find(chat=>chat.id===chatId)
                    if (chat) {
                        chat.messages.push(newMessage)
                    }
                })
            } catch (error) {
                console.error("Failed to add new Message : ", error);
            } finally {
                set({ isLoading: false });
            }
        },
    }))
);
