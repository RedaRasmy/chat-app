import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import ChatInputs from './ChatInputs'
import type { Chat } from '@/db/types'
import useChat from '@/hooks/useChat'

export default function Chat({chatId}:{
    chatId:Chat['id']
}) {

    const {chat,messages,seeChat} = useChat(chatId)

    useEffect(()=>{
        async function handleSeeChat() {
            if (messages.length>0) {
                await seeChat()
            }
        }
        handleSeeChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[messages.length])

    return (
        <div className={cn("gap-5 flex flex-col w-full h-full")}>
                <ChatHeader chatName={chat.friend.username}/>
                <Messages messages={messages}/>
                <ChatInputs chatId={chatId} />
        </div>
    )
}
