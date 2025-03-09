import { useUserStore } from "@/zustand/userStore"
import { useEffect, useRef, useState } from "react"


export default function useInitUser() {
    const setUser = useUserStore(state=>state.setUser)
    const setUserRef = useRef(setUser)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(()=>{
        async function initUser() {
            setIsLoading(true)
            await setUserRef.current()
            setIsLoading(false)
        }
        initUser()
    },[])

    return isLoading
}
