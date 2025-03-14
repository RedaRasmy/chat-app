import { getSuggestedUsers, getUsersByUsername } from "@/actions";
import { useEffect, useMemo, useState } from "react";
import { SUser } from "@/db/types";
import useUser from "./useUser";
import useChatsQuery from "./useChatsQuery";
import getFreindsIds from "@/utils/getFriendsIds";

export default function useResults(query: string) {
    const [results, setResults] = useState<SUser[]>([]);
    const { id } = useUser();
    const chats = useChatsQuery();
    const friendsIds = useMemo(() => getFreindsIds(chats, id), [chats, id]);
    // const friendsIds = getFreindsIds(useChatsQuery(),id)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("useResults/useEffect runs");
        async function getResults() {
            setIsLoading(true);
            try {
                if (friendsIds) {
                    const data =
                        query === ""
                            ? await getSuggestedUsers({
                                userId: id,
                                friendsIds,
                            })
                            : await getUsersByUsername(query);
                    setResults(data ?? []);
                }
            } catch (error) {
                console.error("Failed to get results/suggestions : ", error);
            } finally {
                setIsLoading(false);
            }
        }
        getResults();
    }, [query, id, friendsIds]);

    return { results, isLoading, friendsIds };
}
