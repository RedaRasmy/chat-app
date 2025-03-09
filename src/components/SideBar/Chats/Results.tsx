import {
    getSuggestedUsers,
    getUsersByUsername,
} from "@/actions";
import ResultUserLabel from "./ResultUserLabel";
import { useEffect, useState } from "react";
import { SUser } from "@/db/types";

export default function Results({ query }: { query: string }) {
    const isSuggest = query === "";
    const [results, setResults] = useState<SUser[]>([]);

    useEffect(() => {
        async function getResults() {
            const data = isSuggest
                ? await getSuggestedUsers()
                : await getUsersByUsername(query);

            setResults(data ?? []);
        }
        getResults();
    }, [query, isSuggest]);

    return (
        <div>
            <h1>{isSuggest ? "Suggestions" : "Results"}</h1>
            {!!results?.length &&
                results.map((user) => (
                    <ResultUserLabel
                        key={user.id}
                        username={user.username}
                        id={user.id}
                    />
                ))}
        </div>
    );
}
