import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { NewChatModal } from "./newChatModal";
import useChatsQuery from "@/hooks/useChatsQuery";
import { RefreshCcw } from "lucide-react";
import { getFullChats } from "@/actions";
import { useChatsStore } from "@/zustand/chatsStore";
import useUser from "@/hooks/useUser";

export default function Chats() {
    const chats = useChatsQuery();
    const setChats = useChatsStore((state) => state.setChats);
    const { id } = useUser();

    async function refreshChats() {
        const data = await getFullChats(id);
        setChats(data);
    }

    return (
        <div className="mt-5 flex-1">
            <div className="flex items-center justify-between mb-4">
                <h1 className="pl-4 text-xl">Chats</h1>
                <div className="flex items-center gap-2">
                    <RefreshCcw onClick={refreshChats} size={19} className="cursor-pointer"/>
                    <NewChatModal />
                </div>
            </div>
            <span className="sr-only">new chat</span>
            {!!chats &&
                chats.map((chat) => (
                    <div key={chat.id}>
                        <ChatLabel chat={chat} />
                        <Separator className="my-2" />
                    </div>
                ))}
        </div>
    );
}
