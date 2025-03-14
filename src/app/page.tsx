"use client";
import Loading from "./loading";
import useInit from "@/hooks/init/useInit";
import ChatApp from "@/components/ChatApp";

export default function Home() {
    const isLoading = useInit();

    if (isLoading) return <Loading />;

    return <ChatApp/>
}
