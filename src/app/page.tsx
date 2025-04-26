"use client"
import ChatApp from "@/components/ChatApp"
import { useSession } from "@/lib/auth-client"
// import useInitUser from "@/hooks/useInitUser";
import { useInitSocket } from "@/ws/hooks/useInitSocket"
import Loading from "./loading"

export default function Home() {
    useInitSocket()
    // useInitUser()
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
