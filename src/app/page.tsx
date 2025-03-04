import Sidebar from "@/components/SideBar/Sidebar";
import Chat from "../components/Chat/Chat";

export default async function Home() {
    return (
        <div className="flex h-full">
            <Sidebar/>
            <Chat />
        </div>
    );
}
