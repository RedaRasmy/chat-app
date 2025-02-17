export type Message = {
    id: string,
    content : string,
    author : string,
    time : string
}

export type Chat = {
    id : string,
    name: string,
    messages : Message[],
    participants : string[],
    unreadMessages? : number,
    lastMessage? : string,
    lastMessageTime? : string
}