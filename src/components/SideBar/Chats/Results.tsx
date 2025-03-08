

export default function Results({query}:{query:string}) {
    const isSuggest = query === ''

    return (
        <div >
            <h1>{isSuggest ? "Suggestions" : 'Results' }</h1>
        </div>
    )
}
