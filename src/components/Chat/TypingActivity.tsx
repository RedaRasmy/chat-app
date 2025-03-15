import { useCurrentChatId } from "@/hooks/useCurrentChat"
import useIsTyping from "@/hooks/useIsTyping"

export default function TypingActivity() {
    const chatId = useCurrentChatId()
    if (!chatId) throw new Error('chatId undefined')
        
    const isTyping = useIsTyping(chatId)

    if (isTyping) return (
        <div className="flex bg-gray-400 sticky w-fit px-2 py-1 rounded-md bottom-5 left-0 my-4 items-center gap-1 font-semibold">typing<span className="loading-dots -mb-2 loading-sm loading"/></div>
    )
}
