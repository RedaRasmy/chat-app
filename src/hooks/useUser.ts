import { useSession } from "@/lib/auth-client"


export default function useUser() {
    const {data} = useSession()
    
    return data?.user
}

