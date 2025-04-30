
import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import useChatInputs from "@/hooks/useChatInputs";
import { Input } from "../ui/input";

export default function ChatInputs({chatId}:{chatId:string}) {
    const {handleSubmit,setMessage,message} = useChatInputs(chatId)

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-10 p-4 gap-4 flex items-center justify-center"
        >
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Write a message..."
                className="max-w-md"
            />
            <Button
                className="disabled:opacity-50 rounded-full cursor-pointer! bg-gray-300 hover:bg-gray-200"
                variant={"ghost"}
                size={"icon"}
                disabled={message.length === 0}
            >
                <SendHorizonal />
            </Button>
        </form>
    );
}
