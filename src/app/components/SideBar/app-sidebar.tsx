import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import Chats from "./Chats/Chats";
import Header from "./Header/Header";
import Link from "next/link";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Header />
            </SidebarHeader>
            <SidebarContent>
                <Chats />
            </SidebarContent>
            <SidebarFooter>
                <Link href={"/api/auth/signout?callbackUrl=/"}>
                    Logout
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}
