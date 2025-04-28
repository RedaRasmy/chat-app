import { useSocketStore } from "@/zustand/useSocketStore";
import { EventEmitterParams } from "../events.types";

export function useSocketEmit() {
    const socket = useSocketStore((state) => state.socket);

    
    const emitEvent = ({name,payload}:EventEmitterParams) => {
        if (!socket) {
            console.warn("Socket is not initialized");
            return;
        }
        socket.emit(name, payload);
    };

    return emitEvent; // ✅ Return function for easy usage
}