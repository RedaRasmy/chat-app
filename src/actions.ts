'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "./db/drizzle"
import { users } from "./db/schema"
import { eq, ilike } from "drizzle-orm"

export const addUser = async () => {
    const {getUser ,getPermission} = getKindeServerSession()
    const isAdmin = (await getPermission('access:dashboard'))?.isGranted
    const role = isAdmin ? 'admin' : 'user'
    const user = await getUser()

    const foundUser = await db.select().from(users).where(eq(users.email,user.email ?? ''))

    if (foundUser.length === 0 && user.username && user.email) {
        await db.insert(users).values({
            username : user.username,
            email : user.email ,
            role,
            // createdAt: new Date()
        })
    }
}

export const getSuggestedUsers = async () => {
    const suggestedUsers = await db
        .select()
        .from(users)
        .limit(5)
    
    return suggestedUsers
}

export const getUsersByUsername = async (query:string) => {
    if (query.length === 0) {return }

    const usersFound = await db
        .select()
        .from(users)
        .where(ilike(users.username , query))

    return usersFound
}

export const getChats = async () => {
    const {getUser } = getKindeServerSession()
    const email = (await getUser()).email

    const chats = await db 
        .select()
        .from()
}