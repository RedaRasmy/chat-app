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

export default function Home() {
    const currentChatId = useCurrentChatStore((state) => state.currentChatId);

    return (
        <div className="flex h-full">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={30}
                    minSize={20}
                    maxSize={60}
                    className={cn({
                        flex: currentChatId === undefined,
                        "hidden md:flex": currentChatId !== undefined,
                    })}
                >
                    <Sidebar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                    defaultSize={70}
                    className={cn({
                        flex: currentChatId !== undefined,
                        "hidden md:flex": currentChatId === undefined,
                    })}
                >
                    <Chat chatId={currentChatId} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
