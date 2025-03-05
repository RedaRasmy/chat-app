import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function UserLabel() {

    return (
        <div className="flex items-center gap-2 p-2 mb-2 cursor-pointer">
            <Avatar >
                <AvatarImage src={''}/>
                <AvatarFallback>{}</AvatarFallback>
            </Avatar>
            <h1 className="font-semibold tracking-wider text-lg">{} Reda</h1>
            {true && <p className="text-yellow-600">(admin)</p>}
        </div>
    )
}
