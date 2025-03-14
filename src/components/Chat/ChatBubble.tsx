type ChatBubbleProps = {
    content: string;
    isUserMessage: boolean;
    author?: string;
};

export default function ChatBubble({
    content,
    isUserMessage,
}: ChatBubbleProps) {
    if (isUserMessage)
        return (
            <div className="chat chat-end ">
                <MessageContent content={content} />
            </div>
        );
    return (
        <div className="chat chat-start">
            <MessageContent content={content} />
        </div>
    );
}

const MessageContent = ({ content }: { content: string }) => (
    <div className="chat-bubble pr-7 break-words ">
        {content}
    </div>
);
