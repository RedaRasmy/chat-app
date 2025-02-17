import { Chat } from "@/app/types/chat.type";


export default function ChatLabel({chat}:{chat:Chat}) {
    return <div>{chat.name}</div>
}
