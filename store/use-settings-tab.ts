import { create } from "zustand";
import { persist } from "zustand/middleware"

type userSettingsTabStoreType = {
    tab: string,
    setTab: (tab: string) => void,
    hasHydrated: boolean,
    setHasHydrated: (value: boolean) => void
}

export const userSettingsTabStore = create<userSettingsTabStoreType>()(
    persist( //here i did this persist the state even the page hard reloads
        (set) => ({
            tab: "account", // i kept the tab by default "" why because when i reload first it goes to default tab then changes to persisted tab
            setTab: (tab) => set({ tab }),
            hasHydrated: false,
            setHasHydrated: (value: boolean) => set({ hasHydrated: value })
        }),
        { 
            name: "settings-tab",
            partialize: (state) => ({ tab: state.tab }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
    )
)