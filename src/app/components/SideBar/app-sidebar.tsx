import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import Chats from "./Chats/Chats";
import Header from "./Header/Header";


export function AppSidebar() {

    return (
        <Sidebar>
            <SidebarHeader>
                <Header/>
            </SidebarHeader>
            <SidebarContent>
                <Chats />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
}
