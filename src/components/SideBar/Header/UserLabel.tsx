import { Avatar, AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";
// import { useUser } from "@/components/user-provider";
// import useUser from "@/hooks/useUser";
// import { useSession } from "@/lib/auth-client";

export default function UserLabel() {

    // const user = useUser()
    const {data} = useSession()
    // const user = useUser()

    const user = data?.user
    console.log('user in label:',user)
    return (
        <div className="flex items-center gap-2 p-2 mb-2 cursor-pointer">
            <Avatar >
                <AvatarImage src={user?.image ?? ''}/>
                <AvatarFallback>{user?.username?.at(0)}</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold tracking-wider text-lg capitalize">{user?.username}</h1>
        </div>
    )
}
