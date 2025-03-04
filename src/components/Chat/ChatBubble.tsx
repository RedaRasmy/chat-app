
type ChatBubbleProps = {
    content : string,
    isUserMessage : boolean,
    author : string
}

export default function ChatBubble({
    content,isUserMessage,author
}:ChatBubbleProps) {

    if (isUserMessage) return (
        <div>
            <div className="chat chat-end justify-end">
                <div className="chat-bubble">{content}</div>
            </div>
        </div>
    );
    return (
        <div className="chat chat-start">
            <div className="chat-bubble ">
                <p className="text-xs text-amber-400 mb-1">{author}</p>
                {content}
            </div>
        </div>
    );
}
