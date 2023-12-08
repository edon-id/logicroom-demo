export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | undefined;
  imgPath: string;
}

export interface Sale {
  id?: number;
  productId: number;
  productName: string;
  price: number;
}

export interface Order {
  fullName: string;
  email: string;
  address: string;
  paymentMethod: string;
}

export interface Urls {
  url: string;
}
