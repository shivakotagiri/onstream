import { recommendedUsers } from "@/actions/recommendation";
import { Stream } from "@/db/schema";
import { create } from "zustand";

type RecommendUsersType = {
    id: string;
    name: string;
    bio: string | null;
    username: string | null; 
    email: string;
    emailVerified: boolean;
    displayUsername: string | null;
    phoneNumber: string | null;
    bannerImage: string | null;
    image: string | null;
    sessionVersion: number | null;
    dob: Date | null;
    createdAt: Date;
    updatedAt: Date;
    phoneNumberVerified: boolean | null;
    stream: Stream | null,
}

type Store = {
    users: RecommendUsersType[],
    loading: boolean;
    fetched: boolean;
    fetchUsers: (userId: string | null) => Promise<void>;
    currentUserId: string | null;
    reset: () => void;
}

export const useRecommendStore = create<Store>((set, get) => ({
    users: [],
    loading: false,
    fetched: false,
    currentUserId: null,

    fetchUsers: async (userId) => {
        const { fetched, currentUserId } = get();

        if(fetched && currentUserId === userId) return;

        set({ loading: true });

        const res = await recommendedUsers();
        set({
            users: res || [],
            loading: false,
            fetched: true,
            currentUserId: userId
        })
    },

    reset: () => {
        set({
            loading: false,
            fetched: false,
            currentUserId: null,
            users: []
        });
    }
}))