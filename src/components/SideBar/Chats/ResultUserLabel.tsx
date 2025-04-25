import {  UserPlus, UsersRound } from "lucide-react";
import MyAvatar from "./MyAvatar";
import { cn } from "@/lib/utils";
import useUser from "@/hooks/useUser";
import useChats from "@/hooks/useChats";

export default function ResultUserLabel({
    username,
    image,
    id,
    isFriend,
}: {
    username: string;
    id: string;
    image?: string;
    isFriend: boolean;
}) {

    const {addOne} = useChats()
    const user = useUser()

    if (user) return (
        <div className="flex items-center justify-between my-3 px-4">
            <div className="items-center flex gap-2 ">
                <MyAvatar
                    name={username}
                    image={image}
                />
                <p>{username}</p>
            </div>
            {isFriend ? (
                <UsersRound />
            ) : (
                <UserPlus
                    className={cn("cursor-pointer",{
                        // 'opacity-20' : isLoading && target === id
                    })}
                    onClick={() => addOne({
                        participant1: user.id,
                        participant2: id
                    })}
                />
            )}
        </div>
    );
}
