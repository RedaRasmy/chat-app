"use client";
import Sidebar from "@/components/SideBar/Sidebar";
import Chat from "../components/Chat/Chat";
import {
    ResizablePanelGroup,
    ResizableHandle,
    ResizablePanel,
} from "@/components/ui/resizable";
import { useCurrentChatStore } from "@/zustand/currentChatStore";
import { cn } from "@/lib/utils";
import useInitUser from "@/hooks/useInitUser";
import Loading from "./loading";

export default function Home() {
    const currentChat = useCurrentChatStore((state) => state.currentChat);
    const isLoading = useInitUser()

    if (isLoading) return <Loading/>

    return (
        <div className="flex h-full">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={30}
                    minSize={20}
                    maxSize={60}
                    className={cn({
                        flex: currentChat === undefined,
                        "hidden md:flex": currentChat !== undefined,
                    })}
                >
                    <Sidebar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                    defaultSize={70}
                    className={cn({
                        flex: currentChat !== undefined,
                        "hidden md:flex": currentChat === undefined,
                    })}
                >
                    <Chat chat={currentChat} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
