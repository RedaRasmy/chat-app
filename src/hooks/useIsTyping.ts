import { useEffect, useState } from "react"
import { useSocketEvents } from "@/ws/hooks/useSocketEvents"

export default function useIsTyping(chatId: string) {
    const [isTyping, setIsTyping] = useState(false)

    useSocketEvents([
        {
            name: "typing",
            handler: (receivedChatId) => {
                if (receivedChatId === chatId) {
                    setIsTyping(true)
                }
            },
        },
    ])

    useEffect(() => {
        if (!isTyping) return
        setTimeout(() => {
            setIsTyping(false)
        }, 3000)
    }, [isTyping])

    return isTyping
}
