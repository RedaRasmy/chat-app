import { FullChat } from "@/db/types"

export const getOtherParticipant = (chat:FullChat,id:string):Participant => {
    return chat.participant1.id === id
    ? chat.participant2
    : chat.participant1
}

type Participant = {
    id: string;
    username: string;
    email: string;
    role: "admin" | "user";
    createdAt: Date;
    updatedAt: Date;
}