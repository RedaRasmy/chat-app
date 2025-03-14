import ResultUserLabel from "./ResultUserLabel";
import useResults from "@/hooks/useResults";

export default function Results({ query }: { query: string }) {
    
    const {results,isLoading,friendsIds} = useResults(query)
    const isSuggest = query === ''

    return (
        <div className="">
            <h1>{isSuggest ? "Suggestions" : "Results"}</h1>
            {!isLoading ?
                results.map((user) => (
                    <ResultUserLabel
                        isFriend={friendsIds.includes(user.id)}
                        key={user.id}
                        username={user.username}
                        id={user.id}
                        role={user.role}
                    />
                ))
                : <div className="flex justify-center items-center pt-5">
                    <span className="loading m-auto loading-dots loading-md"/>
                </div>
            }
        </div>
    );
}
