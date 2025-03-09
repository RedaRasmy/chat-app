"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "./db/drizzle";
import { chats, messages, users } from "./db/schema";
import { and, eq, ilike, ne, or } from "drizzle-orm";

// MARK: ADD USER

export const addUser = async () => {
    const { getUser, getPermission } = getKindeServerSession();
    const isAdmin = (await getPermission("access:dashboard"))?.isGranted;
    const role = isAdmin ? "admin" : "user";
    const user = await getUser();

    const foundUser = await db.query.users.findFirst({
        where: eq(users.email, user.email ?? ""),
    });

    if (foundUser) {
        return foundUser;
    }

    if (user.username && user.email) {
        const newUser = (
            await db
                .insert(users)
                .values({
                    username: user.username,
                    email: user.email,
                    role,
                })
                .returning()
        )[0];
        return newUser;
    }
};

// MARK: GET SUGGESTION

export const getSuggestedUsers = async () => {
    const userId = (await getCurrentUser())?.id;

    if (!userId) {
        return;
    }

    const suggestedUsers = await db
        .select()
        .from(users)
        .where(ne(users.id, userId))
        .limit(5);

    return suggestedUsers;
};

// MARK: GET USERS

export const getUsersByUsername = async (query: string) => {
    if (query.length === 0) {
        return;
    }

    const userId = (await getCurrentUser())?.id;

    if (!userId) {
        return;
    }

    const usersFound = await db
        .select()
        .from(users)
        .where(and(ilike(users.username, query), ne(users.id, userId)));

    return usersFound;
};

// MARK: GET USER

export const getCurrentUser = async () => {
    const { getUser } = getKindeServerSession();
    const email = (await getUser()).email;

    if (!email) {
        return;
    }

    const user = (
        await db.select().from(users).where(eq(users.email, email))
    )[0];

    return user;
};

// MARK: GET CHATS

export const getFullChats = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return;
    }

    const userId = user.id;

    const chatsFound = await db.query.chats.findMany({
        where: or(
            eq(chats.participant1, userId),
            eq(chats.participant2, userId)
        ),
        with: {
            participant1: true,
            participant2: true,
            messages: true,
        },
    });

    return chatsFound;
};

// MARK: GET CHAT
export const getFullChatById = async (chatId: string) => {
    const chatFound = await db.query.chats.findFirst({
        where: eq(chats.id, chatId),
        with: {
            participant1: true,
            participant2: true,
            messages: true,
        },
    });

    return chatFound;
};

// MARK: ADD CHAT

export const addChat = async (participant2: string) => {
    const user = await getCurrentUser();

    if (!user || user.id === participant2) {
        return;
    }

    const id = (
        await db
            .insert(chats)
            .values({
                participant1: user.id,
                participant2: participant2,
            })
            .returning({ id: chats.id })
    )[0].id;

    const newChat = await getFullChatById(id);
    return newChat;
};

// MARK: ADD MESSAGE

export const addMessage = async (
    userId: string,
    chatId: string,
    content: string
) => {
    const newMessage = (
        await db
            .insert(messages)
            .values({ chatId, content, senderId: userId })
            .returning()
    )[0];
    return newMessage
};

// i think i need to use websocket on this
// export const getMessages = async (chatId:string) => {
//     const chatMessages = await db.
//         query.messages.findMany({
//             with: {

//             }
//         })
// }
