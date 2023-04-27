import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuid } from "uuid";

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

export interface CartItem {
  id: string;
  productId: number;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  quantity: number;
}

interface CartStoreState {
  items: CartItem[];
  quantity: number;
  addItem: (product: Product) => void;
  removeItem: (itemId: string) => void;
}

export const useCart = create<CartStoreState>()(
  devtools((set) => ({
    items: [],
    quantity: 0,
    addItem: (product) =>
      set((state) => {
        const itemIndex = state.items.findIndex(
          (i) => i.productId === product.id
        );
        if (itemIndex > -1) {
          const newItems = [...state.items];
          newItems[itemIndex].quantity = state.items[itemIndex].quantity + 1;
          const newQuantity = newItems.reduce((p, c) => p + c.quantity, 0);
          return { items: newItems, quantity: newQuantity };
        }
        return {
          items: [
            ...state.items,
            {
              id: uuid(),
              productId: product.id,
              title: product.title,
              price: product.price,
              discountPercentage: product.discountPercentage,
              stock: product.stock,
              thumbnail: product.thumbnail,
              quantity: 1,
            } as CartItem,
          ],
          quantity: state.items.reduce((p, c) => p + c.quantity, 1),
        };
      }),
    removeItem: (itemId) =>
      set((state) => ({ items: state.items.filter((i) => i.id === itemId) })),
  }))
);
