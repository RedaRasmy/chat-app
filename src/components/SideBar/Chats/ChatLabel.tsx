import MyAvatar from "./MyAvatar";
import { Chat } from "@/db/types";
import useUser from "@/hooks/useUser";
import { useUpdateCurrentChat } from "@/hooks/useCurrentChat";
import getLastMessageDate from "@/utils/getLastMessageDate";
import useChat from "@/hooks/useChat";

export default function ChatLabel({ chat }: {
    chat : Chat
}) {
    const user = useUser();
    const updateCurrentChatId = useUpdateCurrentChat();

    const {isTyping,messages} = useChat(chat.id)

    // const friend = getOtherParticipant(chat, id);
    const name = chat.friend.username

    const lastMessage = !!messages.length ? messages.at(-1) : undefined

    const lastMessageDate = lastMessage && getLastMessageDate(lastMessage.createdAt);

    const unSeenMessages = user 
        ? messages.filter(
            (message) => message.senderId !== user.id && !message.seen
        ).length
        : 0


    return (
        <div
            className="flex items-center justify-between gap-3 cursor-pointer"
            onClick={() => updateCurrentChatId(chat.id)}
        >
            <MyAvatar name={name} />

            <div className="grid grid-rows-2 w-full -space-y-2">
                <div className="flex items-center justify-between ">
                    <p className="font-semibold flex items-center">
                        {name}
                    </p>
                    <p className="text-xs text-nowrap">{lastMessageDate}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs -mb-1 text-slate-500 overflow-hidden w-[80%] whitespace-nowrap text-ellipsis">
                        {isTyping ? (
                            <span className="text-green-400">typing...</span>
                        ) : (
                            lastMessage?.content ?? <span className="text-green-400">new chat!</span>
                        )}
                    </p>
                    {!!unSeenMessages && (
                        <p className="ml-auto size-4 text-xs text-center rounded-full badge-accent">
                            {unSeenMessages}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
