import { cn } from "@/lib/utils";
import Sidebar from "./SideBar/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { useCurrentChatId } from "@/hooks/useCurrentChat";
import useChatApp from "@/hooks/useChatApp";
import Chat from './Chat/Chat'


export default function ChatApp() {
    const currentChat = useCurrentChatId();
    useChatApp()
    
    return (
        <div
        data-testid='chatApp'
        className="flex h-full"
    >
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
                <Chat />
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
    )
}
