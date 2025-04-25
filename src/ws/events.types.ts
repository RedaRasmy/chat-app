import { SMessage, SUser } from "@/db/types"


type Id = SUser['id']

export type Event = MessageEvent | SeeEvent | TypingEvent

export type MessageEvent = {
    name : 'message' ,
    handler : (message:SMessage) => void
}
export type SeeEvent = {
    name : 'see' ,
    handler : (chatId:Id) => void
}
export type TypingEvent = {
    name : 'typing' ,
    handler : (chatId:Id) => void
}


export interface MessagePayload {
    recipientId : Id
    message : SMessage
}

export interface SeePayload {
    recipientId : Id
    chatId : Id
}

export interface TypingPayload {
    recipientId : Id
    chatId : Id
}

// Emitters

export type MessageEmitterParams = {name:'message',payload:MessagePayload}
export type SeeEmitterParams = {name:'see',payload:SeePayload}
export type TypingEmitterParams = {name:'typing',payload:TypingPayload}
export type RegisterEmitterParams = {name:'register',payload:{
    userId : SUser['id']
}}

export type EventEmitterParams = 
    | MessageEmitterParams 
    | SeeEmitterParams 
    | TypingEmitterParams 
    | RegisterEmitterParams

