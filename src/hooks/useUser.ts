import { useUserStore } from "@/zustand/useUserStore"

export default function useUser() {
    const user = useUserStore((state) => state.user )
    
    return user
}
