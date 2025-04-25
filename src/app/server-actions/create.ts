'use server'
import { db } from "@/db/drizzle"
import { chats, messages, users } from "@/db/schema"
import { insertChatSchema, insertMessageSchema, insertUserSchema } from "@/db/zod-schemas"
import { actionClient } from "@/lib/safe-action"
import cleanChat from "@/utils/cleanChat"
import { and, eq, or } from "drizzle-orm"

// MARK: CREATE USER
export const createUser = actionClient
    .metadata({actionName:"create-user"})
    .schema(insertUserSchema)
    .action(async ({parsedInput}) => {
        const {username,email} = parsedInput

        const foundUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (foundUser) {
            return foundUser;
        }

        const newUser = (
            await db
                .insert(users)
                .values({
                    username,
                    email,
                })
                .returning()
        )[0];

        return newUser;
    })


// MARK: CREATE CHAT
export const createChat = actionClient
    .metadata({actionName: "create-chat"})
    .schema(insertChatSchema)
    .action(async ({ parsedInput }) => {
        const { participant1, participant2 } = parsedInput

        const existingChat = await db.query.chats.findFirst({
            where: or(
                and(
                    eq(chats.participant1, participant1),
                    eq(chats.participant2, participant2)
                ),
                and(
                    eq(chats.participant1, participant2),
                    eq(chats.participant2, participant1)
                )
            ),
            with : {
                participant1 : true,
                participant2 : true
            }
        })

        if (existingChat) return cleanChat(existingChat, participant1)

        const newChat = (
            await db
                .insert(chats)
                .values({
                    participant1: participant1,
                    participant2: participant2,
                })
                .returning()
        )[0]

        const friend = await db.query.users.findFirst({
            where : eq(users.id , participant2)
        })

        if (friend) {
            return {
                id : newChat.id,
                createdAt: newChat.createdAt,
                updatedAt: newChat.updatedAt,
                friend
            }
        }

    })

// MARK: CREATE MESSAGE
export const createMessage = actionClient
    .metadata({actionName: "create-message"})
    .schema(insertMessageSchema)
    .action(async ({parsedInput}) => {
        const {chatId,content,senderId} = parsedInput

        const newMessage = (
            await db
                .insert(messages)
                .values({ chatId, content, senderId })
                .returning()
        )[0];

        return newMessage;
    })


