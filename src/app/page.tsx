"use client"
import ChatApp from "@/components/ChatApp"
import { useSession } from "@/lib/auth-client"


import Loading from "./loading"

export default function Home() {
    const { isPending } = useSession()


    if (isPending) return <Loading />

    // if (error) return <div>{error.message}</div>

    // if (!data) return <div>Not Authorized</div>

    return (
        // <UserProvider user={data.user as SUser}>
            <ChatApp />
        // </UserProvider>
    )
}
