import {
    addChat,
    addMessage,
    getFullChatById,
    seeChat,
    seeChatWithUser,
} from "@/actions"
import { FullChat, SMessage } from "@/db/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"

type ChatsState = {
    chats: FullChat[] | undefined
    isLoading: boolean
    target: string | undefined
}

type ChatsActions = {
    setChats: (chats: FullChat[]) => void
    addNewChat: ({
        participant1,
        participant2,
    }: {
        participant1: string
        participant2: string
    }) => Promise<FullChat | undefined>
    addNewMessage: ({
        chatId,
        content,
        userId,
    }: {
        chatId: string
        userId: string
        content: string
    }) => Promise<SMessage | undefined>
    addReceivedMessage: (
        message: SMessage,
        seen?: boolean
    ) => Promise<void>
    seeMessages: ({
        userId,
        chatId,
    }: {
        userId: string
        chatId: string
    }) => Promise<void>
}

export const useChatsStore = create<ChatsState & ChatsActions>()(
    persist(
        immer((set, get) => ({
            chats: undefined,
            isLoading: false,
            target: undefined,
            setChats: (chats) =>
                set({
                    chats,
                }),
            // MARK: ADD NEW CHAT
            addNewChat: async ({ participant1, participant2 }) => {
                set({ isLoading: true, target: participant2 })
                try {
                    const newChat = await addChat({
                        participant1,
                        participant2,
                    })
                    set({ isLoading: false, target: undefined })
                    if (newChat) {
                        set((draft) => {
                            if (draft.chats) {
                                draft.chats.push(newChat)
                            } else {
                                draft.chats = [newChat]
                            }
                        })
                        return newChat
                    }
                } catch (error) {
                    console.error("Failed to add new chat : ", error)
                } finally {
                    set({ isLoading: false })
                }
            },
            // MARK: ADD NEW MESSAGE
            addNewMessage: async ({ chatId, userId, content }) => {
                try {
                    set({ isLoading: true })
                    const newMessage = await addMessage({
                        userId,
                        chatId,
                        content,
                    })
                    set({ isLoading: false })
                    set((state) => {
                        const chat = state.chats?.find(
                            (chat) => chat.id === chatId
                        )
                        if (chat) {
                            chat.messages.push(newMessage)
                        }
                    })
                    return newMessage
                } catch (error) {
                    console.error(
                        "Failed to add new Message : ",
                        error
                    )
                } finally {
                    set({ isLoading: false })
                }
            },
            // MARK: ADD RECEIVED MESSAGE
            addReceivedMessage: async (message, seen = false) => {
                const chat = get().chats?.find(
                    (chat) => chat.id === message.chatId
                )
                if (chat) {
                    set((draft) => {
                        const existingChat = draft.chats?.find(
                            (chat) => chat.id === message.chatId
                        )
                        if (existingChat) {
                            if (
                                existingChat.messages.some(
                                    (m) => m.id === message.id
                                )
                            )
                                return
                            existingChat.messages.push({
                                ...message,
                                seen,
                            })
                        }
                    })
                } else {
                    if (
                        get().chats &&
                        get().chats?.some(
                            (chat) => chat.id === message.chatId
                        )
                    )
                        return
                    const newChat = await getFullChatById(
                        message.chatId
                    )
                    if (newChat) {
                        set((draft) => {
                            if (draft.chats) {
                                draft.chats.push(newChat)
                            } else {
                                draft.chats = [newChat]
                            }
                        })
                    }
                }
                if (seen) {
                    await seeChat({
                        chatId: message.chatId,
                        senderId: message.senderId,
                    })
                }
            },
            // MARK: SEE MESSAGES
            seeMessages: async ({ chatId, userId }) => {
                set((draft) => {
                    draft.chats?.forEach((chat) => {
                        if (chat.id === chatId) {
                            chat.messages.forEach((message) => {
                                if (
                                    message.senderId !== userId &&
                                    !message.seen
                                ) {
                                    message.seen = true
                                    console.log(
                                        "new message.seen : ",
                                        message.seen
                                    )
                                }
                            })
                        }
                    })
                })
                await seeChatWithUser({ userId, chatId })
            },
        })),
        {
            name: "chats",
        }
    )
)
