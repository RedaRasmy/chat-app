"use client"
import ChatApp from "@/components/ChatApp"
// import { UserProvider } from "@/components/user-provider"
// import { SUser } from "@/db/types"
// import { auth } from "@/lib/auth"
// import { headers } from "next/headers"
import { useSession } from "@/lib/auth-client"
import Loading from "./loading"
// import { getSessionCookie } from "better-auth/cookies"


// import Loading from "./loading"

export default function Home() {
    const { isPending ,  } = useSession()

    // const data = await auth.api.getSession({
    //     headers : await headers()
    // })

    // console.log('session in home :',data)
    if (isPending) return <Loading />

    // if (error) return <div>{error.message}</div>

    // if (!data) return <div>Not Authorized</div>

    return (
        // <UserProvider user={data.user as SUser}>
            <ChatApp />
        // </UserProvider>
    )
}
