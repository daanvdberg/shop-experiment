import { Category, Product } from "@features/shop";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Store state for Catalog
 */

interface ProductStoreState {
  categories: Category[];
  products: Product[];
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
}

export const useProducts = create<ProductStoreState>()(
  devtools((set) => ({
    categories: [],
    products: [],
    setCategories: (categories) => set({ categories }),
    setProducts: (products) => set({ products }),
  }))
);
