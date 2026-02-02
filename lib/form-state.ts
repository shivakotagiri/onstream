import { create } from "zustand";

type SignupState = {
  email: string;
  username: string;
  password: string;

  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;

  reset: () => void;
};

export const useSignupStore = create<SignupState>((set) => ({
  email: "",
  username: "",
  password: "",

  setEmail: (email) => set({ email }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),

  reset: () =>
    set({
      email: "",
      username: "",
      password: "",
    }),
}));
