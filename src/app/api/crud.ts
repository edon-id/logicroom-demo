import api from "./api";
import { Order, Product, Sale } from "../../types/types";

// PRODUCTS

// CREATE PRODUCT

export const createProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response = await api.post("/products", newProduct);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// READ PRODUCT

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE PRODUCT

export const updateProduct = async (
  id: number,
  updatedProduct: Product
): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE PRODUCT

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////

// ORDERS //

// READ ORDERS

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE ORDERS

export const updateOrderStatus = async (
  id: number,
  updatedOrderStatus: Order
): Promise<Order> => {
  try {
    const response = await api.put(`/orders/${id}`, updatedOrderStatus);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE ORDERS

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await api.delete(`/orders/${id}`);
  } catch (error) {
    throw error;
  }
};

/////////////////////////////////////////////////////////////////////////////

// SALES //

// READ SALES

export const getSales = async (): Promise<Sale[]> => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};
