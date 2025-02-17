
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import Messages from "./Messages";


export default function Chat() {
    return (
        <div className="gap-5 w-full flex flex-col h-full">
            <ChatHeader chatName="chatroom 0"/>
            <Messages/>
            <ChatInputs/>
        </div>
    )
}
