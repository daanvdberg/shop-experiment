import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthStoreState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthUser = create<AuthStoreState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }))
);

export type Category =
  | "mens-watches"
  | "womens-watches"
  | "womens-bags"
  | "womens-jewellery"
  | "sunglasses";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductStoreState {
  categories: Category[];
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProducts = create<ProductStoreState>()(
  devtools((set) => ({
    categories: [],
    products: [],
    setProducts: (products) => set({ products }),
  }))
);
