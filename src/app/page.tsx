import Chat from "./components/Chat/Chat";
import SideBar from "./components/SideBar/SideBar";


export default function Home() {

    return (
        <div className="flex h-[100dvh]">
            <SideBar/>
            <Chat/>
        </div>
    );
}
