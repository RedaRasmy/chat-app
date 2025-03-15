
import useInitUser from './useInitUser'

export default function useInit() {
    const isLoading1 = useInitUser()

    return isLoading1 
}
