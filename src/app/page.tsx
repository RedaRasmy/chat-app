"use client";
import ChatApp from "@/components/ChatApp";
// import useInitUser from "@/hooks/useInitUser";
import { useInitSocket } from "@/ws/hooks/useInitSocket";

export default function Home() {
    useInitSocket()
    // useInitUser()

    // if (!isAuthenticated ) return <div>loading...</div>

    return <ChatApp/>
}
