"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { EdgeStoreProvider } from "../lib/edgestore";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "LogicRoom Tech App Dashboard",
  description: "Generated by logicroom.tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <CacheProvider>
          <ChakraProvider>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
