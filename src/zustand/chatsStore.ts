import { addChat, addMessage, getFullChatById, seeChat } from "@/actions";
import { FullChat, SChat, SMessage } from "@/db/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type ChatsState = {
    chats: FullChat[] | undefined;
    isLoading: boolean;
};

type ChatsActions = {
    setChats: (chats: FullChat[]) => void;
    addNewChat: (participant2: string) => Promise<SChat | undefined>;
    addNewMessage: ({
        chatId,
        content,
        userId,
    }: {
        chatId: string;
        userId: string;
        content: string;
    }) => Promise<SMessage | undefined>;
    addReceivedMessage: (message: SMessage) => Promise<void>;
    seeMessages : ({userId,chatId}:{userId:string,chatId:string}) => Promise<void>
};

export const useChatsStore = create<ChatsState & ChatsActions>()(
    persist(
        immer((set, get) => ({
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
                            chats: state.chats
                                ? [...state.chats, newChat]
                                : [newChat],
                        }));
                        return newChat;
                    }
                } catch (error) {
                    console.error("Failed to add new chat : ", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            addNewMessage: async ({ chatId, userId, content }) => {
                try {
                    set({ isLoading: true });
                    const newMessage = await addMessage({
                        userId,
                        chatId,
                        content,
                    });
                    set({ isLoading: false });
                    set((state) => {
                        const chat = state.chats?.find(
                            (chat) => chat.id === chatId
                        );
                        if (chat) {
                            chat.messages.push(newMessage);
                        }
                    });
                    return newMessage;
                } catch (error) {
                    console.error("Failed to add new Message : ", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            addReceivedMessage: async (message) => {
                console.log('adding received message...')
                const chat = get().chats?.find(
                    (chat) => chat.id === message.chatId
                );
                if (chat) {
                    set((draft) => {
                        const existingChat = draft.chats?.find(
                            (chat) => chat.id === message.chatId
                        );
                        if (existingChat) {
                            existingChat.messages.push(message);
                        }
                    });
                } else {
                    const newChat = await getFullChatById(message.chatId);
                    if (newChat) {
                        set((draft)=>{
                            if (draft.chats) {
                                draft.chats.push(newChat)
                            } else {
                                draft.chats = [newChat]
                            }
                        })
                    }
                }
            },
            seeMessages : async ({chatId,userId}) => {
                set((draft)=> {
                    const chat = draft.chats?.find(chat=>chat.id === chatId)
                    if (chat) {
                        chat.messages.forEach(message=>{
                            if (message.senderId !== userId && !message.seen) {
                                message.seen = true
                            }
                        })
                    }
                })
                await seeChat({userId,chatId})
            }
        })),
        {
            name: "chats",
        }
    )
);
