import { create } from "zustand";

type User = {
  _id: string;
  email: string;
  isVerified: boolean;
};

type UserStore = {
  user: User;
  setUser: (newState: User) => void;
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (newState: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    _id: "",
    email: "",
    isVerified: false,
  },
  setUser: (newState) => set({ user: newState }),
  isLoading: false,
  setIsLoading: (newState) => set({ isLoading: newState }),
  isSuccess: false,
  setIsSuccess: (newState) => set({ isSuccess: newState }),
}));
