import { useUserStore } from "@/zustand/useUserStore"
// import { useStore } from "zustand";
// import { shallow } from "zustand/shallow";

export default function useUser() {
    const user = useUserStore((state) => state.user )

    // const u = useStore(useUserStore , (state)=> state.user , {
    //     equalityFn : shallow
    // }) 
    
    return user
}
