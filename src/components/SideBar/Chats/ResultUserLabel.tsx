import {  UserPlus, UsersRound } from "lucide-react";
import MyAvatar from "./MyAvatar";
import useChatsMutation from "@/hooks/useChatsMutation";
import { cn } from "@/lib/utils";
import useUser from "@/hooks/useUser";


export default function ResultUserLabel({
    username,
    image,
    id,
    role,
    isFriend,
}: {
    username: string;
    id: string;
    image?: string;
    role: "admin" | "user";
    isFriend: boolean;
}) {

    const {addNewChat,isLoading,target} = useChatsMutation()
    const {id:userId} = useUser()

    return (
        <div className="flex items-center justify-between my-3 px-4">
            <div className="items-center flex gap-2 ">
                <MyAvatar
                    name={username}
                    image={image}
                />
                <p>{username}</p>
                {role === "admin" && <p className="text-yellow-600">(admin)</p>}
            </div>
            {isFriend ? (
                <UsersRound />
            ) : (
                <UserPlus
                    className={cn("cursor-pointer",{
                        'opacity-20' : isLoading && target === id
                    })}
                    onClick={() => addNewChat({
                        participant1: userId,
                        participant2: id
                    })}
                />
            )}
        </div>
    );
}
