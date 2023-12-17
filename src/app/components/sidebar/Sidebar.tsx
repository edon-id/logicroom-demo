"use client";

import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { TbShoppingBagCheck } from "react-icons/tb";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log("Logged out");
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>LogicRoom Tech App</h2>
        <ul className="nav-list">
          <li>
            <Link
              className={pathname === "/dashboard" ? "active" : ""}
              href="/dashboard"
            >
              <MdDashboard /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/dashboard/products" ? "active" : ""}
              href="/dashboard/products"
            >
              <FaBox /> <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/dashboard/orders" ? "active" : ""}
              href="/dashboard/orders"
            >
              <TbShoppingBagCheck /> <span>Orders</span>
            </Link>
          </li>
        </ul>
      </div>
      <button type="button" onClick={handleLogout} className="logout-btn">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
