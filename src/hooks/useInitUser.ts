// import { useSocketEmit } from "@/ws/hooks/useSocketEmit"
// import { useUserStore } from "@/zustand/useUserStore"
// import { useEffect } from "react"

// export default function useInitUser() {
//     const setUser = useUserStore((state) => state.setUser)


    // const emit = useSocketEmit()

    // useEffect(() => {
    //     async function initUser() {
    //         try {
    //             const user = await setUser({username,email})
    //             console.log('user:' , user)

    //             if (!user) {
    //                 console.warn('User object is missing');
    //                 return;
    //             }

    //             emit({
    //                 name : 'register',
    //                 payload : {
    //                     userId : user.id
    //                 }
    //             })

    //         } catch (error) {
    //             console.error("Failed to init user : ", error)
    //         }
    //     }
    //     initUser()

    // }, [emit,setUser])

// }
