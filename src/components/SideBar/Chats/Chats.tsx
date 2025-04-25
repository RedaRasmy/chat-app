import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { NewChatModal } from "./newChatModal";
import useChats from "@/hooks/useChats";

export default function Chats() {
    const {chats} = useChats()

    return (
        <div className="mt-5 flex-1">
            <div className="flex items-center justify-between mb-4">
                <h1 className="pl-4 text-xl">Chats</h1>
                <div className="flex items-center gap-2">
                    {/* <RefreshCcw onClick={refreshChats} size={19} className="cursor-pointer"/> */}
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
