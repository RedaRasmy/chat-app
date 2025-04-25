import { useSocketEmit } from "@/ws/hooks/useSocketEmit"
import { useUserStore } from "@/zustand/useUserStore"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useEffect, useMemo, } from "react"

export default function useInitUser() {
    const setUser = useUserStore((state) => state.setUser)

    // const {  isAuthenticated ,user} = useKindeAuth()

    const {user, isAuthenticated} = useKindeBrowserClient()
    
    const kindeUser = useMemo(() => user, [isAuthenticated]);

    console.log('is auth:',isAuthenticated)
    console.log('kinde user :',user)

    // const kindeUser = useMemo(() => getUser(), [isAuthenticated]);

    const email = kindeUser?.email
    const username = kindeUser?.username

    // const userData = user?.email && user.given_name ? { 
    //     username : user.given_name ,
    //     email : user.email
    // } : null;

    // const userData = useMemo(() => 
    //     isAuthenticated && email && username ? { email, username } : null, 
    //     [isAuthenticated, email, username]
    // );

    const emit = useSocketEmit()

    console.log('user data:',username , email)


    useEffect(() => {
        async function initUser() {
            if (!username || !email) return;
            try {
                const user = await setUser({username,email})
                console.log('user:' , user)

                if (!user) {
                    console.warn('User object is missing');
                    return;
                }

                emit({
                    name : 'register',
                    payload : {
                        userId : user.id
                    }
                })

            } catch (error) {
                console.error("Failed to init user : ", error)
            }
        }
        initUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [username,email,emit,setUser])


    return {
        isAuthenticated
    }
}
