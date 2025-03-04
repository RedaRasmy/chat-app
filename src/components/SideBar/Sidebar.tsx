import Chats from "./Chats/Chats"
import LogoutButton from "./Footer/LogoutButton"
import Header from "./Header/Header"

export default function Sidebar() {
    return (
        <div>
            <Header/>
            <Chats/>
            <LogoutButton/>
        </div>
    )
}
