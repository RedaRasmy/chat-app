import { useUserStore } from "@/zustand/userStore";

export default function useUser() {
    const user = useUserStore(state=>state.user)

    if (!user) {
        throw new Error('User not defined')
    }
    
    return user
}
