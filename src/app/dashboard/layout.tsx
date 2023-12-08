"use client";
import "./dashboard.css";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning={true} className="dashboardLayout">
      <div className="">
        <Sidebar />
      </div>
      <div className="dashboardLayoutChildren">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
