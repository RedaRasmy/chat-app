
import { useChatsStore } from "@/zustand/chatsStore";

export default function useChatsQuery() {
    const chats = useChatsStore(state=>state.chats)

    return chats ? chats : []
}
