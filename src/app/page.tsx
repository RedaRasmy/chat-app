import { SidebarProvider } from "@/components/ui/sidebar";
import Chat from "./components/Chat/Chat";
import { AppSidebar } from "./components/SideBar/app-sidebar";
// import { getServerSession } from "next-auth";
// import { options } from "./api/auth/[...nextauth]/options";
// import { redirect } from "next/navigation";

export default async function Home() {
    // const session = await getServerSession(options);

    // if (!session) {
    //     redirect("/api/auth/signin");
    // }

    return (
        <SidebarProvider defaultOpen >
            <AppSidebar />
            <main className="w-full">
                <Chat />
            </main>
        </SidebarProvider>
    );

}
