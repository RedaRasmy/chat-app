import MyAvatar from "./MyAvatar";
import { FullChat } from "@/db/types";
import { getOtherParticipant } from "@/utils/getChatName";
import useUser from "@/hooks/useUser";
import { useUpdateCurrentChat } from "@/hooks/useCurrentChat";
import getLastMessageDate from "@/utils/getLastMessageDate";
import useIsTyping from "@/hooks/useIsTyping";

export default function ChatLabel({ chat }: { chat: FullChat }) {
    const { id } = useUser();
    const updateCurrentChatId = useUpdateCurrentChat();

    const friend = getOtherParticipant(chat, id);

    const lastMessage = chat.messages[chat.messages.length - 1];
    const lastMessageDate = getLastMessageDate(lastMessage.createdAt);
    const unSeenMessages = chat.messages.filter(
        (message) => message.senderId !== id && !message.seen
    ).length;

    const isTyping = useIsTyping(chat.id);

    return (
        <div
            className="flex items-center justify-between gap-3 cursor-pointer"
            onClick={() => updateCurrentChatId(chat.id)}
        >
            <MyAvatar name={friend.username} />

            <div className="grid grid-rows-2 w-full -space-y-2">
                <div className="flex items-center justify-between ">
                    <p className="font-semibold ">
                        {friend.username}
                        {friend.role === "admin" && (
                            <span className="text-yellow-500 text-xs ml-2">(admin)</span>
                        )}
                    </p>
                    <p className="text-xs text-nowrap">{lastMessageDate}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs -mb-1 text-slate-500 overflow-hidden w-[80%] whitespace-nowrap text-ellipsis">
                        {isTyping ? (
                            <span className="text-green-400">typing...</span>
                        ) : (
                            lastMessage.content
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
