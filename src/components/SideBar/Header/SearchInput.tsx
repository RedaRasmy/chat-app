import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <form action="" >
            <label className="input bg-slate-400 py-1 flex items-center ">
                <input
                    type="text"
                    className="grow w-[90%] text-black placeholder:text-zinc-600"
                    placeholder="Filter.."
                />
                <Search className="text-white size-5 "/>
            </label>
        </form>
    );
}
