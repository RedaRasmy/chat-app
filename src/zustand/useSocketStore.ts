import { create } from "zustand"
import { Socket } from "socket.io-client"
import { immer } from "zustand/middleware/immer"

type SocketStore = {
    socket: Socket | undefined
    uid: string

    // actions types
    updateSocket: (socket: Socket) => void
    updateUid: (uid: string) => void
}

export const useSocketStore = create<SocketStore>()(
    immer((set) => ({
        socket: undefined,
        uid: "",

        // actions
        updateSocket: (socket) => {
            set({socket})
        },
        updateUid: (uid) => {
            set({ uid })
        },
    }))
)
