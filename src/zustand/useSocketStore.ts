import { create } from "zustand"
import { io, Socket } from "socket.io-client"
import { immer } from "zustand/middleware/immer"

type SocketStore = {
    socket: Socket | undefined
    uid: string

    // actions types
    updateSocket: (socket: Socket) => void
    updateUid: (uid: string) => void
}

const socket = io()

export const useSocketStore = create<SocketStore>()(
    immer((set) => ({
        socket,
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
