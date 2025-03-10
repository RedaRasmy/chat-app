import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrentChatStore = {
    currentChatId: string | undefined;
    updateCurrentChatId: (id: string | undefined) => void;
};

export const useCurrentChatStore = create<CurrentChatStore>()(
    persist(
        (set) => ({
            currentChatId: undefined,
            updateCurrentChatId: (id) =>
                set({
                    currentChatId: id,
                }),
        }),
        {
            name: "currentChatId",
        }
    )
);
