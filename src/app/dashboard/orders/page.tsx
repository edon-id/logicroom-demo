"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import isAuthenticated from "../../../hooks/IsAuthenticated";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import "./orders.css";

const OrdersPage = () => {
  const { user } = isAuthenticated();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      {isClient ? (
        <div className="orders">
          <Button colorScheme="teal" size="md">
            <Link href={"/dashboard"}>&#8249; Go to dashboard</Link>
          </Button>
          <br />
          <br />
          <Button colorScheme="teal" variant="outline">
            <Link href={"/dashboard/products"}>&#8249; Go to products</Link>
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default OrdersPage;
