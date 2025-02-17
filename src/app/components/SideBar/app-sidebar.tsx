
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import Chats from "./Chats/Chats";

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarHeader>
                header
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <Chats />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                footer
            </SidebarFooter>
        </Sidebar>
    );
}
