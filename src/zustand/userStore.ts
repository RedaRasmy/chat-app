import { addUser } from "@/actions";
import { IUser, SUser } from "@/db/types";
import { create } from "zustand";

type UserState = {
    user: SUser | undefined ,
    isLoading : boolean
}

type UserActions = {
    setUser:  (user:IUser) => Promise<void>;
};

export const useUserStore = create<UserState & UserActions>((set) => ({
    user : undefined ,
    isLoading : false ,
    setUser: async (user:IUser) => {
        try {
            set({isLoading:true})
            const newUser = await addUser(user)
            set({user:newUser})
        } catch (error) {
            console.error('Failed to add/get User : ',error);
        } finally {
            set({isLoading:false})
        }
    }
}))

