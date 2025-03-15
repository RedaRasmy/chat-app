import {format } from 'date-fns'

export default function getMessageDate(date:Date):string {
    return format(date,"h:mm a")
}