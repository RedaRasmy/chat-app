'use server'
import { db } from "@/db/drizzle"
import { chats, messages, user } from "@/db/schema"
import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import cleanChat, { ChatToClean } from "@/utils/cleanChat"
import { and, eq, ilike, inArray, ne, notInArray, or } from "drizzle-orm"
import { headers } from "next/headers"
import { z } from "zod"

// MARK: GET USER
export const getUser = actionClient
    // .schema(z.string().email())
    .metadata({actionName: "get-user"})
    .action(async () => {
        const session = await auth.api.getSession({
            headers : await headers()
        })

        const email = session?.user.email

        if (!email) {
            return
        }
        const foundUser = (
            await db.select().from(user).where(eq(user.email, email))
        )[0]

        return foundUser
    })

// MARK: GET CHATS
export const getChats = actionClient
    .metadata({actionName : 'get-chats'})
    .schema(z.string().min(1))
    .action(async ({ parsedInput: userId }) => {
        const fetchedChats = await db.query.chats.findMany({
            where: or(
                eq(chats.participant1, userId),
                eq(chats.participant2, userId)
            ),
            with: {
                participant1: true,
                participant2: true,
            },
        })

        return fetchedChats.map((chat) => cleanChat(chat as ChatToClean, userId))
    })

// MARK: GET MESSAGES
export const getMessages = actionClient
    .metadata({actionName:'get-messages'})
    .schema(z.array(z.string().min(1)))
    .action(async ({ parsedInput: chatsIds }) => {

        const fetchedMessages = await db.query.messages.findMany({
            where: inArray(messages.chatId, chatsIds),
            orderBy: messages.createdAt,
        })

        return fetchedMessages
    })

// MARK: GET SUGGESTIONS
export const getSuggestedUsers = actionClient
    .metadata({actionName: 'get-suggested-users'})
    .schema(
        z.object({
            userId: z.string().min(1),
            friendsIds: z.array(z.string().min(1)),
        })
    )
    .action(async ({ parsedInput }) => {
        const { userId, friendsIds } = parsedInput

        const suggestedUsers = await db
            .query
            .user
            .findMany({
                where : and(
                    ne(user.id, userId), 
                    notInArray(user.id, friendsIds)
                ) ,
                limit : 10
            })

        return suggestedUsers
    })

// MARK: GET CHAT
export const getChat = actionClient
    .metadata({actionName: "get-chat"})
    .schema(
        z.object({
            userId: z.string().min(1),
            chatId: z.string().min(1),
        })
    )
    .action(async ({ parsedInput }) => {
        const { userId, chatId } = parsedInput

        const chatFound = await db.query.chats.findFirst({
            where: eq(chats.id, chatId),
            with: {
                participant1: true,
                participant2: true,
            },
        })
        if (chatFound) return cleanChat(chatFound as ChatToClean, userId)
    })



// MARK: GET USERS BY USERNAME

export const getUsersByUsername = actionClient
    .metadata({actionName:'get-users-by-username'})
    .schema(z.object({
        query : z.string().min(1),
        userId : z.string().min(1)
    }))
    .action(async ({parsedInput}) => {
        const {userId,query} = parsedInput

        const usersFound = await db
            .query
            .user
            .findMany({
                where :      
                    and(
                        ilike(user.username, query), 
                        ne(user.id, userId)
                    )
            })

        return usersFound;
    })

