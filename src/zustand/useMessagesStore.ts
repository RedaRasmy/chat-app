import { Chat, IMessage, SMessage, SUser } from "@/db/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"
import { Entities, EntitiyState } from "@/lib/utils"
import { createMessage } from "@/app/server-actions/create"
import { seeMessages } from "@/app/server-actions/update"

type MessagesActions = {
    addOne : (message: IMessage) => Promise<SMessage | undefined>
    addReceivedOne : (message: SMessage) => void
    see: ({
        userId,
        chatId,
    }: {
        userId: SUser["id"]
        chatId: Chat["id"]
    }) => Promise<void>
    setAll: (chats: SMessage[] | Entities<SMessage>) => void

    // addMany : (messages:IMessage[]) => SMessage[]
    // updateOne : ({messageId:SMessage['id'],changes:Partial<SMessage>})
    // updateMany : ()
}

export const useMessagesStore = create<
    EntitiyState<SMessage> & MessagesActions
>()(
    persist(
        immer((set) => ({
            entities: {},
            ids: [],

            // actions 
            setAll: (messages) => {
                set({
                    entities: Array.isArray(messages)
                        ? messages.reduce<Entities<SMessage>>((acc, message) => {
                                acc[message.id] = message
                                return acc
                            }, {})
                        : messages,
                    ids: Array.isArray(messages)
                        ? messages.map((message) => message.id)
                        : Object.keys(messages),
                })
            },
            async addOne(message) {
                const res = await createMessage(message)
                const newMessage = res?.data

                if (newMessage) {
                    set((draft) => {
                        draft.entities[newMessage.id] = newMessage
                        draft.ids.unshift(newMessage.id)
                    })
                    return newMessage
                }
            },
            see: async ({ userId, chatId }) => {
                set((draft) => {
                    draft.entities = Object.fromEntries(
                        Object.entries(draft.entities).map(([id, message]) => {
                            if (
                                message.chatId === chatId &&
                                message.senderId !== userId
                            ) {
                                return [id, { ...message, seen: true }]
                            } else return [id, message]
                        })
                    )
                })
                await seeMessages({ userId, chatId })
            },
            addReceivedOne: (message) => {
                set((draft) => {
                    draft.entities[message.id] = message
                    draft.ids.unshift(message.id)
                })
            },
        })),
        {
            name: "messages",
        }
    )
)
