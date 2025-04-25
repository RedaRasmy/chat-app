import { Avatar, AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import useUser from "@/hooks/useUser";

export default function UserLabel() {

    const user = useUser()

    console.log('user in label:',user)
    return (
        <div className="flex items-center gap-2 p-2 mb-2 cursor-pointer">
            <Avatar >
                <AvatarImage src={''}/>
                <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold tracking-wider text-lg capitalize">{user?.username}</h1>
        </div>
    )
}
