import { Avatar, AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import useUser from "@/hooks/useUser";

export default function UserLabel() {

    const {username,role} = useUser()

    console.log('role:',role)

    // if (isLoading) return <p>laoding...</p>

    return (
        <div className="flex items-center gap-2 p-2 mb-2 cursor-pointer">
            <Avatar >
                <AvatarImage src={''}/>
                <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold tracking-wider text-lg capitalize">{username}</h1>
            {role === 'admin' && <p className="text-yellow-600">(admin)</p>}
        </div>
    )
}
