
import useInitUser from './useInitUser'
import useInitChats from './useInitChats'

// returns isLoding : user and chats

export default function useInit() {
    const isLoading1 = useInitUser()
    const isLoading2 = useInitChats()

    return isLoading1 || isLoading2
}
