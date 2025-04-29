import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"

export const actionClient = createSafeActionClient({
    defineMetadataSchema: () =>
        z.object({
            actionName: z.string().min(1),
        }),
    handleServerError(e, utils) {
        // You can access these properties inside the `utils` object.
        // const { clientInput, bindArgsClientInputs, metadata, ctx } = utils

        console.error('action name : :',utils.metadata.actionName)

        // Log to console.
        console.error("Action error:", e.message)

        // Return generic message
        // return "Oh no, something went wrong!"
        return e.message
    },
})
