"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/types";
import { getProducts } from "../api/crud";
import isAuthenticated from "@/hooks/IsAuthenticated";
import { FaBox } from "react-icons/fa";
import { TbShoppingBagCheck } from "react-icons/tb";
import { IoBarChart } from "react-icons/io5";
import Image from "next/image";

const Dashboard = () => {
  const { user } = isAuthenticated();
  const [isClient, setIsClient] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  const lastThreeProductsAdded = products.slice(-3);
  // console.log(lastThreeProductsAdded);

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

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
                <p>0</p>
                {/* <p>{orders.length}</p> */}
              </Link>
            </div>
            <div className="card total-sales">
              <div className="icon">
                <IoBarChart />
              </div>
              <Link href={"/dashboard"}>
                <h2>Total Sales</h2>
                <p>0</p>
                {/* <p>{sales.length}</p> */}
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
