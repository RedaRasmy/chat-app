import {  useUpdateCurrentChat } from "@/hooks/useCurrentChat";
import { 
    ArrowLeft,
} from "lucide-react";

export default function ChatHeader({ chatName }: { chatName: string }) {
    const updateCurrentChat = useUpdateCurrentChat()

    return (
        <div className="bg-accent min-h-10 text-black justify-between flex items-center px-4">
            <div className="flex items-center gap-4">
                <ArrowLeft
                    onClick={() => updateCurrentChat(undefined)}
                    className="cursor-pointer"
                    color="gray"
                />
                <h1>{chatName}</h1>
            </div>
        </div>
    );
}
