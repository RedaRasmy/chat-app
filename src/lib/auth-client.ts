import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    //you can pass client configuration here
    plugins : [
        usernameClient()
    ]
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient