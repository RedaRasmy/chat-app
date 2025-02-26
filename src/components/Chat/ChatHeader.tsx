import { SidebarTrigger } from "@/components/ui/sidebar";
import { EllipsisVertical } from "lucide-react";


export default function ChatHeader( {chatName} : {chatName:string}) {
    return <div className="bg-gray-500 min-h-10 text-black justify-between flex items-center px-4">
        <div className="flex items-center gap-4">  
            <SidebarTrigger  />
            <h1>{chatName ?? 'chatroom'}</h1>
        </div>
        <EllipsisVertical />
    </div>;
}
