import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


export default function useIsAdmin() {
    const {getPermission} = useKindeBrowserClient()

    return getPermission('access:dashboard').isGranted
}
