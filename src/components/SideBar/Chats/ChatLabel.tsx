import { Chat } from "@/app/types/chat.type";
import { useCurrentChatStore } from "@/zustand/currentChatStore";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ChatLabel({ chat }: { chat: Chat }) {
    const updateCurrentChat = useCurrentChatStore(
        (state) => state.updateCurrentChat
    );

    return (
        <div
            className="flex items-center justify-between space-x-2 cursor-pointer"
            onClick={() => updateCurrentChat(chat.id)}
        >
            <Avatar className="size-8 rounded-full bg-slate-400 flex justify-center items-center">
                <AvatarImage
                    className="rounded-full"
                    src=""
                    alt="@shadcn"
                />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1">
                <p>{chat.name}</p>
                <p className="text-xs text-slate-500">{chat.lastMessage}</p>
            </div>
            <div className="flex flex-col ">
                <p className="text-xs">{chat.lastMessageTime}</p>
                <p className="ml-auto size-4 text-xs text-center rounded-full badge-accent">
                    {chat.unreadMessages}
                </p>
            </div>
        </div>
    );
}
