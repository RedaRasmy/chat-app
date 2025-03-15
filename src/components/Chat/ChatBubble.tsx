type ChatBubbleProps = {
    content: string;
    isUserMessage: boolean;
    author?: string;
    time : string
};

export default function ChatBubble({
    content,
    isUserMessage,
    time
}: ChatBubbleProps) {
    if (isUserMessage)
        return (
            <div className="chat chat-end ">
                <MessageContent content={content} time={time} />
            </div>
        );
    return (
        <div className="chat chat-start">
            <MessageContent content={content} time={time} />
        </div>
    );
}

const MessageContent = ({ content , time }: { content: string, time: string }) => (
    <div className="chat-bubble  break-words -space-y-3">
        <p className="pr-12 text-white">{content}</p>
        <p className="text-[0.6rem] leading-3 text-end ">{time}</p>
    </div>
);
