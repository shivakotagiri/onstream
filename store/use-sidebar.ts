import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SidebarProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (value: boolean) => void

  openMobile: boolean
  setOpenMobile: (value: boolean) => void

  isMobile: boolean
  setIsMobile: (value: boolean) => void

  toggleSidebar: () => void

  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
}

export const useSidebar = create<SidebarProps>()(
  persist(
    (set) => ({
      state: "collapsed",
      open: false,

      setOpen: (value: boolean) =>
        set({ open: value, state: value ? "expanded" : "collapsed" }),

      openMobile: false,
      setOpenMobile: (value: boolean) => set({ openMobile: value }),

      isMobile: false,
      setIsMobile: (value: boolean) =>
        set((prev) => ({
          isMobile: value,
          open: value ? false : prev.open,
          state: value ? "collapsed" : prev.state,
        })),

      toggleSidebar: () =>
        set((prev) => {
          if (prev.isMobile) {
            return { openMobile: !prev.openMobile }
          }
          const next = !prev.open
          return { open: next, state: next ? "expanded" : "collapsed" }
        }),

      hasHydrated: false,
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({ open: state.open, state: state.state }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)