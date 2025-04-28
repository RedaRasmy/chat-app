import { useEffect } from "react"
import { Event } from "../events.types";
import useSocket from "./useSocket";
// import { socket } from "../socket"


export function useSocketEvents(events: Event[]) {
    const {socket} = useSocket()


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
