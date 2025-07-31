import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    currentUser: null,
    setCurrentUser: (newUser) => set({ currentUser: newUser }),
    removeCurrentUser: () => set({ currentUser: null }),
    updateCurrentUser: (updateUser) => set({ currentUser: updateUser }),
  }))
);

export default useAuthStore;
