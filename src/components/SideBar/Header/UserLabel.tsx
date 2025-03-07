import { Avatar, AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import useIsAdmin from "@/hooks/useIsAdmin";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export default function UserLabel() {
    const {getUser} = useKindeBrowserClient()
    const isAdmin = useIsAdmin()
    const user: KindeUser | null = getUser()
    console.log(user)

    return (
        <div className="flex items-center gap-2 p-2 mb-2 cursor-pointer">
            <Avatar >
                <AvatarImage src={''}/>
                <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold tracking-wider text-lg capitalize">{user?.username}</h1>
            {isAdmin && <p className="text-yellow-600">(admin)</p>}
        </div>
    )
}
