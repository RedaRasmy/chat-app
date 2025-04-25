import { useSocketStore } from "@/zustand/useSocketStore";
import { useEffect, useRef } from "react";
import { io, ManagerOptions, SocketOptions } from "socket.io-client";


export function useInitSocket(opts?:Partial<ManagerOptions & SocketOptions>) {
    const {current: socket} = useRef(io(opts))
    const updateSocket = useSocketStore(state=>state.updateSocket)

    useEffect(()=>{
        updateSocket(socket)
        return ()=>{
            if (socket) socket.close()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket])

}