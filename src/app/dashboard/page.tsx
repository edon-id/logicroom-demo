"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Order, Product, Sale } from "@/types/types";
import { getOrders, getProducts, getSales } from "../api/crud";
import isAuthenticated from "@/hooks/IsAuthenticated";
import { FaBox } from "react-icons/fa";
import { TbShoppingBagCheck } from "react-icons/tb";
import { IoBarChart } from "react-icons/io5";
import Image from "next/image";

const Dashboard = () => {
  const { user } = isAuthenticated();
  const [isClient, setIsClient] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [orders, setOrders] = useState<Order[]>([]);

  const [sales, setSales] = useState<Sale[]>([]);

  const lastThreeProductsAdded = products.slice(-3);

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const ordersData = await getOrders();
        setOrders(ordersData);

        const salesData = await getSales();
        setSales(salesData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = (sales: Sale[]) => {
    return sales.reduce((total, sale) => total + sale.totalPrice, 0);
  };

  const totalPrice = calculateTotalPrice(sales);

  if (!user) {
    return null;
  }

  return (
    <>
      {isClient ? (
        <>
          <div className="dashboardHeader">
            <h2>Dashboard</h2>
            <p>Information about your e-commerce</p>
          </div>
          <div className="dashboard">
            <div className="card total-products">
              <div className="icon">
                <FaBox />
              </div>
              <Link href={"/dashboard/products"}>
                <h2>Total Products</h2>
                <p>{products.length}</p>
              </Link>
            </div>
            <div className="card total-orders">
              <div className="icon">
                <TbShoppingBagCheck />
              </div>
              <Link href={"/dashboard/orders"}>
                <h2>Total Orders</h2>
                <p>{orders.length}</p>
              </Link>
            </div>
            <div className="card total-sales">
              <div className="icon">
                <IoBarChart />
              </div>
              <Link href={"/dashboard"}>
                <h2>Total Sales</h2>
                <p>$ {totalPrice}</p>
              </Link>
            </div>
          </div>
          <h2 className="lastProducts">Last products added</h2>
          <div className="last-products-added-card">
            {lastThreeProductsAdded.map((lastThree) => {
              return (
                <div key={lastThree.id} className="last-products-card">
                  <Image
                    src={lastThree.imgPath}
                    width={300}
                    height={300}
                    alt={lastThree.name}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <h3>{lastThree.name}</h3>
                    <p>${lastThree.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
