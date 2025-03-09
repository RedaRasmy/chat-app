// import { Chat } from "@/app/types/chat.type";
import { useCurrentChatStore } from "@/zustand/currentChatStore";
import MyAvatar from "./MyAvatar";
import { FullChat,  } from "@/db/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getChatName } from "@/utils/getChatName";


export default function ChatLabel({ chat }: { chat: FullChat }) {
    const {getUser} = useKindeBrowserClient()
    const username : string = getUser()?.username
    const updateCurrentChat = useCurrentChatStore(
        (state) => state.updateCurrentChat
    );

    console.log(username)

    const name = getChatName(chat,username)
    

    return (
        <div
            className="flex items-center justify-between space-x-2 cursor-pointer"
            onClick={() => updateCurrentChat(chat)}
        >
            <MyAvatar name={name}/>

            <div className="flex flex-col flex-1">
                <p>{name}</p>
                {/* <p className="text-xs text-slate-500">{chat.lastMessage}</p> */}
            </div>
            <div className="flex flex-col ">
                {/* <p className="text-xs">{chat.lastMessageTime}</p> */}
                {/* <p className="ml-auto size-4 text-xs text-center rounded-full badge-accent">
                    {chat.unreadMessages}
                </p> */}
            </div>
        </div>
    );
}
