'use client'
import{ useState } from 'react'
import ChatBubble from './ChatBubble';
import { mockMessages } from './mock';
import { Message } from '@/app/types/chat.type';

export default function Messages() {
    const [messages, ] = useState<Message[]>(mockMessages);
    
    return (
        <div className="w-full px-4 flex-1">
            {
                messages.map(message=>(
                    <ChatBubble
                        author={message.author}
                        key={message.id}
                        content={message.content}
                        isUserMessage={message.author === "me"}
                    />
                ))
            }
        </div>
    )
}
