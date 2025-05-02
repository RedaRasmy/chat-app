"use client"
import ChatApp from "@/components/ChatApp"
// import { UserProvider } from "@/components/user-provider"
// import { SUser } from "@/db/types"
// import { auth } from "@/lib/auth"
// import { headers } from "next/headers"
import { useSession } from "@/lib/auth-client"
import Loading from "./loading"
import { useEffect, useState } from "react"
// import { getSessionCookie } from "better-auth/cookies"

// import Loading from "./loading"

export default function Home() {
    const { isPending, error, data } = useSession()
    const [, forceUpdate] = useState(0)

    useEffect(() => {
        forceUpdate((prev) => prev + 1)
    }, [data])

    // const data = await auth.api.getSession({
    //     headers : await headers()
    // })

    // throw new Error('test')

    // console.log('session in home :',data)
    if (isPending) return <Loading />

    if (error) throw new Error(error.message)

    // if (!data) return <div>Not Authorized</div>

    return (
        // <UserProvider user={data.user as SUser}>
        <ChatApp />
        // </UserProvider>
    )
}
