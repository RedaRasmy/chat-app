import { useSocketStore } from "@/zustand/useSocketStore"
import { useEffect } from "react"
import { Event } from "../events.types";
// import { socket } from "../socket"


export function useSocketEvents(events: Event[]) {
    const socket = useSocketStore(state=>state.socket)

    useEffect(() => {
        if (!socket) return;

        for (const event of events) {
            socket.on(event.name, event.handler)
        }

        return function () {
            for (const event of events) {
                socket.off(event.name)
            }
        }
    }, [socket,events])
}
