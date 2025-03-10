'use client'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function useRole() {
    const {getPermission} = useKindeBrowserClient()

    return !!getPermission('access:dashboard').isGranted ? 'admin' : 'user'
}
