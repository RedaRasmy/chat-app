import { getSuggestedUsers, getUsersByUsername } from "@/actions";
import { useEffect, useState } from "react";
import useFriends from "./useFriends";
import { SUser } from "@/db/types";
import useUser from "./useUser";

export default function useResults(query:string) {
    const isSuggest = query === "";
    const [results, setResults] = useState<SUser[]>([]);
    const {id} = useUser()
    const {friendsIds} = useFriends()
    const [isLoading , setIsLoading] = useState(false)

    useEffect(() => {
        async function getResults() {
            setIsLoading(true)
            try {
                if (friendsIds) {
                    const data = isSuggest
                    ? await getSuggestedUsers({
                        userId: id,
                        friendsIds
                    })
                    : await getUsersByUsername(query);
                setResults(data ?? []);
                }
            } catch (error) {
                console.error('Failed to get results/suggestions : ',error);
            } finally {
                setIsLoading(false)
            }
        }
        getResults();
    }, [query, isSuggest,friendsIds,id]);

    return {results,isSuggest,isLoading}
}
