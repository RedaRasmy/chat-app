import {  UserPlus, UsersRound } from "lucide-react";
import MyAvatar from "./MyAvatar";
import { addChat } from "@/actions";

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
            {!isFriend ? (
                <UsersRound />
            ) : (
                <UserPlus
                    className="cursor-pointer"
                    onClick={() => addChat(id)}
                />
            )}
        </div>
    );
}
