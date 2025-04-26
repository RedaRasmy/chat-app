
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
    return (
        <Button 
            onClick={async ()=>{await signOut()}}
            className="flex items-center cursor-pointer justify-center gap-2 m-2 w-fit" variant={'ghost'} >
            <LogOut/>
            Logout
        </Button>
    )
}
