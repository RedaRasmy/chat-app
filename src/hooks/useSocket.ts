import { useSocketStore } from "@/zustand/socketStore";


export default function useSocket() {
    return useSocketStore()
}
