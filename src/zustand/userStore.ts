import { addUser } from "@/actions";
import { SUser } from "@/db/types";
import { create } from "zustand";

type UserState = {
    user: SUser | undefined
}

type UserActions = {
    setUser:  () => Promise<void>;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    user : undefined ,
    setUser: async () => {
        const newUser = await addUser()
        return set({user:newUser})
    }
}))

