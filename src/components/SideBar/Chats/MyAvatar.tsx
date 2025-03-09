import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MyAvatar({
    name , image
}:{
    name : string,
    image?: string
}) {
    return (
        <Avatar className="size-8 rounded-full bg-slate-400 flex justify-center items-center">
            <AvatarImage
                className="rounded-full"
                src={image}
                alt="avatar"
            />
            <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
    );
}
