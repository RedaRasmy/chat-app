// import { userRoles } from '@/db/schema'
// import {z} from 'zod'
// import crypto from 'crypto'
// import { redis } from '@/lib/redis'

// const sessionSchema = z.object({
//     id: z.string(),
//     role : z.enum(userRoles)
// })

// type UserSession = z.infer<typeof sessionSchema>

// export function createUserSession(user:UserSession) {
//     const sessionId = crypto.randomBytes(512).toString('hex').normalize()
//     redis.set(`session:${sessionId}`,sessionSchema.parse(user))

// }