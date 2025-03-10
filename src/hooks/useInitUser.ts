import { useUserStore } from "@/zustand/userStore"
import { useKindeAuth,  } from "@kinde-oss/kinde-auth-nextjs"
// import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types"
import { useEffect, useRef, useState } from "react"
import useRole from "./useRole"


export default function useInitUser() {
    const setUser = useUserStore(state=>state.setUser)
    const setUserRef = useRef(setUser)
    const [isLoading, setIsLoading] = useState(true)

    // const user = useKindeBrowserClient().user as KindeUser
    const {getUser , isAuthenticated } = useKindeAuth()
    const user = getUser()
    const role = useRole()
    
    console.log("user from useInituser : " ,user)


    useEffect(()=>{
        async function initUser() {
            try {
                if (isAuthenticated && user?.email && user.username) {
                    await setUserRef.current({
                        email : user.email,
                        username : user.username,
                        role,
                    })
                    setIsLoading(false)
                }
            } catch (error) {
                console.error("Failed to init user : ",error);
            }
        }
        initUser()
    },[role,user?.email,user?.username,isAuthenticated])

    return isLoading
}
