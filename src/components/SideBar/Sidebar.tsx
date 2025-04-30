
import Chats from "./Chats/Chats"
import LogoutButton from "./Footer/LogoutButton"
import Header from "./Header/Header"
import { cn } from "@/lib/utils"

export default function Sidebar() {

    return (
        <div className={cn("px-4 py-4 flex flex-col w-full h-full bg-accent")}>
            <Header/>
            <Chats/>
            <LogoutButton/>
        </div>
    )
}
