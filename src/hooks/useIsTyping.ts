import { useEffect, useState } from 'react'
import useSocket from './useSocket'

export default function useIsTyping(chatId:string) {
        const [isTyping,setIsTyping] = useState(false)
        const {socket} = useSocket()
    
        useEffect(()=>{
            socket.on('receive-typing', (receivedChatId) => {
                if (receivedChatId === chatId) {
                    setIsTyping(true)
                }
            })
        },[socket,isTyping,chatId])
    
        useEffect(()=>{
            if (!isTyping) return ;
            setTimeout(() => {
                setIsTyping(false)
            }, 3000);
        },[isTyping])
    
        return isTyping
}
