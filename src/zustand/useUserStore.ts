import { createUser } from "@/app/server-actions/create";
import { IUser, SUser } from "@/db/types";
import { create } from "zustand";

type UserState = {
    user: SUser | undefined
}

type UserActions = {
    setUser:  (userData:IUser) => Promise<SUser | undefined>;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    user : undefined ,
    setUser: async (userData:IUser) => {
        const res = await createUser(userData)

        const user = res?.data

        if (user) {
            set({user})
            return user
        }
    }
}))

