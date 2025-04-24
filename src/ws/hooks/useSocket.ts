import { useEffect, useRef } from "react";
import { io, ManagerOptions, SocketOptions } from "socket.io-client";


export function useSocket(opts?:Partial<ManagerOptions & SocketOptions>) {
    const {current: socket} = useRef(io(opts))

    useEffect(()=>{
        return ()=>{
            if (socket) socket.close()
        }
    },[socket])

    return socket
}