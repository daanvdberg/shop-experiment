export type CategoryKey =
  | "mens-watches"
  | "womens-watches"
  | "womens-bags"
  | "womens-jewellery"
  | "sunglasses";

export interface Category {
  id: CategoryKey;
  title: string;
  thumbnail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: CategoryKey;
  thumbnail: string;
  images: string[];
}
