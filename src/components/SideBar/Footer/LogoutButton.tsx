import { logout } from "@/app/server-actions/auth-actions"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
    return (
        <Button
            onClick={async () => {
                await logout()
                localStorage.removeItem("chats")
                localStorage.removeItem("messages")
                localStorage.removeItem("currentChatId")
            }}
            className="flex items-center cursor-pointer justify-center gap-2 m-2 w-fit"
            variant={"ghost"}
        >
            <LogOut />
            Logout
        </Button>
    )
}
