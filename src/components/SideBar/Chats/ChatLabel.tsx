import MyAvatar from "./MyAvatar";
import { FullChat } from "@/db/types";
import { getChatName } from "@/utils/getChatName";
import useUser from "@/hooks/useUser";
import { useUpdateCurrentChat } from "@/hooks/useCurrentChat";
import getLastMessageDate from "@/utils/getLastMessageDate";

export default function ChatLabel({ chat }: { chat: FullChat }) {
    const { username, id } = useUser();
    const updateCurrentChatId = useUpdateCurrentChat();

    const FriendName = getChatName(chat, username);

    const lastMessage = chat.messages[chat.messages.length - 1];
    const lastMessageDate = getLastMessageDate(lastMessage.createdAt)
    const unSeenMessages = chat.messages.filter(
        (message) => message.senderId !== id && !message.seen
    ).length;

    return (
        <div
            className="flex items-center justify-between gap-3 cursor-pointer"
            onClick={() => updateCurrentChatId(chat.id)}
        >
            <MyAvatar name={FriendName} />

            <div className="grid grid-rows-2 w-full -space-y-2">
                <div className="flex items-center justify-between ">
                    <p className="font-semibold">{FriendName}</p>
                    <p className="text-xs text-nowrap">{lastMessageDate}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs -mb-1 text-slate-500 overflow-hidden w-[80%] whitespace-nowrap text-ellipsis">
                        {lastMessage.content}
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
