import { cn } from '@/lib/utils'
import React from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import ChatInputs from './ChatInputs'
import type { Chat } from '@/db/types'
import useChat from '@/hooks/useChat'

export default function Chat({chatId}:{
    chatId:Chat['id']
}) {

    const {chat,messages} = useChat(chatId)

    return (
        <div className={cn("gap-5 flex flex-col w-full h-full")}>
                <ChatHeader chatName={chat.friend.username}/>
                <Messages messages={messages}/>
                <ChatInputs/>
        </div>
    )
}
