import { IChat, Chat } from "@/db/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"
import { Entities, EntitiyState } from "@/lib/utility-types"
import { createChat } from "@/app/server-actions/create"

type ChatsActions = {
    setAll: (chats: Chat[] | Entities<Chat>) => void
    addOne: (chat: IChat) => Promise<Chat | undefined>
    // addExistingOne : (chatId : Chat['id']) => Promise<void>
}

export const useChatsStore = create<EntitiyState<Chat> & ChatsActions>()(
    persist(
        immer((set) => ({
            entities: {},
            ids: [],
            setAll: (chats) => {
                set({
                    entities: Array.isArray(chats)
                        ? chats.reduce<Entities<Chat>>((acc, chat) => {
                                acc[chat.id] = chat
                                return acc
                            }, {})
                        : chats,
                    ids: Array.isArray(chats)
                        ? chats.map((chat) => chat.id)
                        : Object.keys(chats),
                })
            },
            addOne: async ({ participant1, participant2 }) => {
                const res = await createChat({
                    participant1,
                    participant2,
                })
                // if (!res) return;
                const newChat = res?.data
                if (newChat) {
                    set((draft) => {
                        draft.entities[newChat.id] = newChat as Chat
                        draft.ids.unshift(newChat.id)
                    })
                    return newChat as Chat
                }
            },
        })),
        {
            name: "chats",
        }
    )
)
