import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import React from "react";

export default async function UserLabel() {

    const session = await getServerSession()
    
    const user = session?.user
    
    console.log(user)

    if (user) return (
        <div className="flex items-center gap-2 p-2 mb-2 cursor-pointer">
            <Avatar >
                <AvatarImage src={user.image ?? ''}/>
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold tracking-wider text-lg">{user.name} Reda</h1>
            {user.role === 'admin' && <p className="text-yellow-600">(admin)</p>}
        </div>
    )
}
