import { Plus } from "lucide-react"
import MyAvatar from "./MyAvatar"
import { addChat } from "@/actions"

export default function ResultUserLabel({username , image ,id}:{
    username : string ,
    id : string,
    image? : string
}) {
    return (
        <div className="flex items-center justify-between my-3">
            <div className="items-center flex gap-2 ">
                <MyAvatar name={username} image={image} /> 
                <p>{username}</p>
            </div>
            <Plus
                className="cursor-pointer"
                onClick={()=>addChat(id)}
            />
        </div>
    )
}
