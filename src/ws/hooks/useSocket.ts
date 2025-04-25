import { useSocketStore } from "@/zustand/useSocketStore";


export default function useSocket() {
    return useSocketStore()
}
