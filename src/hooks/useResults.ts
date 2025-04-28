// import { getSuggestedUsers, getUsersByUsername } from "@/actions";
import { useEffect, useState } from "react";
import { SUser } from "@/db/types";
import useUser from "./useUser";
import useChats from "./useChats";
import { getSuggestedUsers, getUsersByUsername } from "@/app/server-actions/get";

export default function useResults(query: string) {
    const [results, setResults] = useState<SUser[]>([]);
    const user = useUser();
    const { friendsIds} = useChats();

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!user) return ;
        async function getResults() {
            if (!user) return ;
            try {
                setIsLoading(true);
                const res =
                    query === ""
                        ? await getSuggestedUsers({
                            userId: user.id,
                            friendsIds,
                        })
                        : await getUsersByUsername({
                            userId : user.id,
                            query 
                        });
                
                const users = res?.data

                if (users) {
                    setResults(users as SUser[])
                }

            } catch (error) {
                console.error("Failed to get results/suggestions : ", error);
            } finally {
                setIsLoading(false);
            }
        }
        getResults();
    }, [friendsIds,query,user]);

    return { results, isLoading, friendsIds };
}
