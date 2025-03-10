import { useEffect, useState } from "react";
import useQueryChats from "./useQueryChats";
import getFreindsIds from "@/utils/getFriendsIds";
import useUser from "./useUser";

export default function useFriends() {
    const {chats,isLoading} = useQueryChats()
    const [friendsIds,setFriendsIds] = useState<string[]|undefined>(undefined) 
    const {id} = useUser()

    useEffect(()=>{
        if (!isLoading && chats) {
            setFriendsIds(getFreindsIds(chats,id))
        }
    },[isLoading, chats,id])

    return {friendsIds}
}
