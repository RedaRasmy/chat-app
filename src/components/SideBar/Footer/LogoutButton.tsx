
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
    return (
        <LogoutLink>
            <button className="flex items-center gap-2 m-2">
                <LogOut/>
                Logout
            </button>
        </LogoutLink>
    )
}
