import { SidebarProvider } from "@/components/ui/sidebar";
import Chat from "./components/Chat/Chat";
import { AppSidebar } from "./components/SideBar/app-sidebar";

export default function Home() {
    return (
        <SidebarProvider defaultOpen >
            <AppSidebar />
            <main className="w-full">
                <Chat />
            </main>
        </SidebarProvider>
    );

}
