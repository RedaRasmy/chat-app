
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import Results from "./Results";
import { FormEvent, useState } from "react";

export function NewChatModal() {
    const [query,setQuery] = useState('')

    function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const currentQuery = data.get('query')
        if (currentQuery) {
            setQuery(currentQuery as string)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Plus className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Chat</DialogTitle>
                    <DialogDescription>
                        Search for other users and start new chats.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form 
                        onSubmit={handleSubmit} 
                        className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="username"
                            className="text-right"
                        >
                            Username
                        </Label>
                        <Input
                            name="query"
                            id="username"
                            className="col-span-3"
                        />
                    </form>
                    <Results query={query} />
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
