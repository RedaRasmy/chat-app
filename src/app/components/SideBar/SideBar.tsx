import SearchInput from "./Header/SearchInput";


export default function SideBar() {
    return (
        <div className="xl:flex flex-col p-4 hidden w-[40%] bg-slate-800">
            <SearchInput/>
        </div>
    )
}
