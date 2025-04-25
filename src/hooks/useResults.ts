// import { getSuggestedUsers, getUsersByUsername } from "@/actions";
import { useEffect, useMemo, useState } from "react";
import { SUser } from "@/db/types";
import useUser from "./useUser";
import useChats from "./useChats";
import { getSuggestedUsers, getUsersByUsername } from "@/app/server-actions/get";

export default function useResults(query: string) {
    const [results, setResults] = useState<SUser[]>([]);
    const user = useUser();
    const {chats} = useChats();
    const friendsIds = useMemo(() => chats.map(chat=>chat.friend.id), [chats]);
    // const friendsIds = chats.map(chat=>chat.friend.id)

    const [isLoading, setIsLoading] = useState(false);
    console.log('user:',user)

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
                    setResults(users)
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
