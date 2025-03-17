// to sort messages in a chat
// insertion sort is the best (i think) 
// because the messages are often sorted 

import { SMessage } from '@/db/types';
import { isBefore } from 'date-fns'

export default function insertionSortMessagesByDate(messages:SMessage[]):SMessage[] {
    const messagesCopy = [...messages]
    for (let i = 1; i < messagesCopy.length; i++) {
        const current = messagesCopy[i]
        let j = i - 1
        while (j >= 0 && isBefore(current.createdAt, messagesCopy[j].createdAt)) {
            messagesCopy[j + 1] = messagesCopy[j]
            j--
        }
        messagesCopy[j + 1] = current
    }
    return messagesCopy
}


