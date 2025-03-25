import { useUserStore } from "@/zustand/userStore";
// import {useUser as useClerkkUser} from '@clerk/nextjs'

export default function useUser() {
    const user = useUserStore(state=>state.user)

    if (!user) {
        throw new Error('User not defined')
    }
    
    return user
}
