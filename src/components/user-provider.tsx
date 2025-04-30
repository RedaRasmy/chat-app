'use client'
import { SUser } from "@/db/types"
import { createContext, ReactNode } from "react"


const UserContext = createContext<SUser | null>(null)

export function UserProvider({
    user,
    children,
}: {
    user: SUser
    children: ReactNode
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

// export function useUser() {
//     return useContext(UserContext) 
// }


// // import { useMemo } from "react";
