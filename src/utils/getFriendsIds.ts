import { FullChat } from "@/db/types";

export default function getFreindsIds(chats: FullChat[], userId:string) {
    const freinds = chats.map((chat) => {
        return chat.participant1.id === userId
            ? chat.participant2.id
            : chat.participant1.id
    });

    return freinds
}
