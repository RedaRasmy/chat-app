import ChatLabel from "./ChatLabel";
import { Separator } from "@/components/ui/separator";
import { NewChatModal } from "./newChatModal";
import useChatsQuery from "@/hooks/useChatsQuery";

export default function Chats() {
    const chats = useChatsQuery();


    return (
        <div className="mt-5 flex-1">
            <div className="flex items-center justify-between mb-4">
                <h1 className="pl-4 text-xl">Chats</h1>
                <NewChatModal />
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
