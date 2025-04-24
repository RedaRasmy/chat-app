import { db } from "@/db/drizzle"
import { messages } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { and, eq, ne } from "drizzle-orm"
import { z } from "zod"

export const seeMessages = actionClient
    .metadata({actionName: "see-messages"})
    .schema(
        z.object({
            chatId: z.string().min(1),
            userId: z.string().min(1),
        })
    )
    .action(async ({ parsedInput }) => {
        const { chatId, userId } = parsedInput

        await db
            .update(messages)
            .set({ seen: true })
            .where(
                and(
                    eq(messages.chatId, chatId), 
                    ne(messages.senderId, userId)
                )
            )
    })
