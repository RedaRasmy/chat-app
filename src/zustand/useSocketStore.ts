import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { immer } from "zustand/middleware/immer";

type SocketStore = {
    socket: Socket;
    connect: () => void;
    disconnect: () => void;
};

export const useSocketStore = create<SocketStore>()(
    immer((set) => ({
        socket: io(),
        connect: () => {
            set((draft)=>{
                if (!draft.socket.connected) {
                    draft.socket.connect()
                }
            });
        },
        disconnect: () => {
            set((draft) => {
                if (draft.socket.connected) {
                    draft.socket.disconnect()
                }
            });
        },
    }))
);
