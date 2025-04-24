import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
    defineMetadataSchema : () => z.object({
        actionName : z.string().min(1)
    })
});