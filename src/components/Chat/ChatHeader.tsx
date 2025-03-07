import { useCurrentChatStore } from "@/zustand/currentChatStore";
import { EllipsisVertical, MoveLeft } from "lucide-react";

export default function ChatHeader({ chatName }: { chatName: string }) {
    const updateCurrentChat = useCurrentChatStore(
        (state) => state.updateCurrentChat
    );

    return (
        <div className="bg-gray-500 min-h-10 text-black justify-between flex items-center px-4">
            <div className="flex items-center gap-4">
                <MoveLeft
                    onClick={() => updateCurrentChat(undefined)}
                    className="cursor-pointer"
                />
                <h1>{chatName ?? "chatroom"}</h1>
            </div>
            <EllipsisVertical />
        </div>
    );
}
