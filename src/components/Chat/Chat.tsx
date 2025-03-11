import type { Chat } from "@/app/types/chat.type";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import Messages from "./Messages";
import { cn } from "@/lib/utils";
import { getChatName } from "@/utils/getChatName";
import useUser from "@/hooks/useUser";
import useJoinChat from "@/hooks/useJoinChat";

export default function Chat() {

    const user = useUser()

    const {chat,isLoading} = useJoinChat()

    if (isLoading) return <p> loading the chat ...</p>

    if (chat) return (
        <div className={cn("gap-5 flex flex-col w-full h-full")}>
            <>
                <ChatHeader chatName={getChatName(chat,user.username)}/>
                <Messages messages={chat.messages}/>
                <ChatInputs/>
            </> 
            
        </div>
    )
    return (
        <div className="flex md:flex flex-col bg-zinc-900 w-full text-white h-full  ">
            <h1 className="flex-1 text-center flex justify-center p-5 items-center text-5xl h-full">
                Start a Chat!
            </h1>
        </div>
    )
}
