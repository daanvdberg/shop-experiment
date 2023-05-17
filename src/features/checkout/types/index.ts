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

export interface CartTotals {
  subTotal: string;
  tax: string;
  total: string;
}
