import { create } from "zustand";

export enum ChatVariant {
  CHAT,
  COMMUNITY
}

interface useChatSidebarProps {
  collapsed: boolean;
  variant: ChatVariant;
  isLive: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebarStore = create<useChatSidebarProps>()((set) => ({
  collapsed: false,
  isLive: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}))