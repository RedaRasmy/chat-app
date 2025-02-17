import { Chat } from "@/app/types/chat.type";
import { mockMessages } from "../../Chat/mock";

export const mockChats:Chat[]= [
    {
        id:'fasjdfj',
        name:'John Doe',  
        lastMessage:'Hello',
        lastMessageTime:'12:00 PM',
        unreadMessages:2,
        messages:mockMessages,
        participants:['me','John Doe'],
    },
    {
        id:'fasjdfjdsaf',
        name:'bomimo', 
        lastMessage:'Hellooo',
        lastMessageTime:'12:00 PM',
        unreadMessages:2,
        messages:mockMessages,
        participants:['me','bomimo'],
    },
]