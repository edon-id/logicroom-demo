export interface Urls {
  url: string;
}
export interface Sale {
  totalPrice: number;
}
export interface Order {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
  orderedAt: string;
  totalPrice: number;
  cartProducts: CartItem[];
  orderStatus: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | undefined;
  imgPath: string;
  productKey?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
