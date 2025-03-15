import {format ,isYesterday , isToday , } from 'date-fns'

export default function getLastMessageDate(date:Date):string {

    if (isToday(date)) {
        return format(date,"h:mm a")
    } 
    if (isYesterday(date)) {
        return 'Yesterday'
    }
    return format(date,"M/d/yyyy")
}