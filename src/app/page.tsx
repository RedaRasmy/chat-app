import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "./components/Chat/Chat";
import SideBar from "./components/SideBar/SideBar";
import { AppSidebar } from "./components/SideBar/app-sidebar";

export default function Home() {
    return (
        <SidebarProvider >
            <AppSidebar />
            <main className="w-full">
                
                <Chat />
            </main>
        </SidebarProvider>
    );

    return (
        <div className="flex h-[100dvh]">
            <SideBar />
            <Chat />
        </div>
    );
}
