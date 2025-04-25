
import { useCurrentChatId } from "@/hooks/useCurrentChat";
import Chat from './Chat'

export default function ChatSection() {

    const currentChatId = useCurrentChatId()

    if (currentChatId) return <Chat chatId={currentChatId} />

    return (
        <div className="flex md:flex flex-col bg-zinc-900 w-full text-white h-full  ">
            <h1 className="flex-1 text-center flex justify-center p-5 items-center text-5xl h-full">
                Start a Chat!
            </h1>
        </div>
    )
}
