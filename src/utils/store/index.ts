import { User } from "firebase/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { formatPrice } from "@utils";

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

/**
 * Store state for Catalog
 */
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

/**
 * Store state for Shopping Cart
 */
export const TAX_PERCENTAGE = 21;

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

interface CartTotals {
  subTotal: string;
  tax: string;
  total: string;
}

interface CartStoreState {
  items: CartItem[];
  quantity: number;
  totals?: CartTotals;
  addItem: (product: Product) => void;
  updateQuantity: (itemId: string, increment?: boolean) => void;
  removeItem: (itemId: string) => void;
}

const convertProductToCartItem = (product: Product): CartItem => ({
  id: uuid(),
  productId: product.id,
  title: product.title,
  price: product.price,
  discountPercentage: product.discountPercentage,
  stock: product.stock,
  thumbnail: product.thumbnail,
  quantity: 1,
});

const calculateTotals = (items: CartItem[]): CartTotals => {
  const total = items.reduce((p, c) => p + c.quantity * c.price, 0);
  return {
    subTotal: formatPrice((total / (100 + TAX_PERCENTAGE)) * 100),
    tax: formatPrice((total / (100 + TAX_PERCENTAGE)) * TAX_PERCENTAGE),
    total: formatPrice(total),
  };
};

const addCartItem = (cartItems: CartItem[], product: Product): CartItem[] => {
  const existingCartItem = cartItems.find((i) => i.productId === product.id);
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.productId === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, convertProductToCartItem(product)];
};

export const useCart = create<CartStoreState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        quantity: 0,
        addItem: (product) =>
          set(({ items }) => {
            const newItems = addCartItem(items, product);
            return {
              items: newItems,
              quantity: newItems.reduce((p, c) => p + c.quantity, 0),
              totals: calculateTotals(newItems),
            };
          }),
        updateQuantity: (itemId, increment = true) =>
          set((state) => {
            const newItems = [...state.items];
            const cartItemIndex = newItems.findIndex((i) => i.id === itemId);
            if (newItems[cartItemIndex].quantity === 1 && !increment)
              return state;
            newItems[cartItemIndex].quantity =
              newItems[cartItemIndex].quantity + (increment ? 1 : -1);
            return {
              items: newItems,
              quantity: increment ? state.quantity++ : state.quantity--,
              totals: calculateTotals(newItems),
            };
          }),
        removeItem: (itemId) =>
          set(({ items }) => {
            const newItems = items.filter((item) => item.id !== itemId);
            return {
              items: newItems,
              quantity: newItems.reduce((p, c) => p + c.quantity, 0),
              totals: calculateTotals(newItems),
            };
          }),
      }),
      {
        name: "user-cart",
      }
    )
  )
);
