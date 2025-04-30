import { SMessage } from "@/db/types";
import { cn } from "@/lib/utils";
import getMessageDate from "@/utils/getMessageDate";
import useUser from "@/hooks/useUser";

type ChatBubbleProps = {
    message: SMessage
    isPending : boolean
};

export default function ChatBubble({
    message,
    isPending
}: ChatBubbleProps) {
    const user = useUser()
    if (!user) return;
    const isSender = message.senderId === user.id
    const showSeen = isSender && message.seen

    console.log('user : ',user)

    return (
        <div className={cn("chat",{
            'opacity-40 ' : isPending,
            'chat-end' : isSender,
            'chat-start' : !isSender
        })}>
            <div className="chat-bubble  break-words -space-y-2">
                <p className="pr-13 text-white">{message.content}</p>
                <div className="text-[0.6rem] leading-3 text-end ">
                    <p>
                        {getMessageDate(message.createdAt)}
                        {showSeen && <span className="text-green-600 ml-1 text-xs">s</span>}
                    </p>
                </div>
            </div>
            
        </div>
    );
}
