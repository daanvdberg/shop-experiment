import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Store state for Authentication
 */
interface AuthStoreState {
  user?: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthUser = create<AuthStoreState>()(
  devtools((set) => ({
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }))
);
