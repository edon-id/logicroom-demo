"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import isAuthenticated from "@/hooks/IsAuthenticated";
import { getOrders, updateOrderStatus } from "@/app/api/crud";
import { Order } from "@/types/types";
import "./orders.css";

const OrdersPage = () => {
  const { user } = isAuthenticated();

  if (!user) {
    return null;
  }

  const [isClient, setIsClient] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setIsClient(true);
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      // Fetch the order by ID from the existing orders
      const orderToUpdate = orders.find((order) => order.id === orderId);

      if (!orderToUpdate) {
        console.error("Order not found");
        return;
      }

      // Create an updated order object with the new status
      const updatedOrder: Order = {
        ...orderToUpdate,
        orderStatus: newStatus,
      };

      // Make API call to update order status
      const response = await updateOrderStatus(orderId, updatedOrder);

      // Update the local state with the updated order from the response
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? response : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusBackgroundColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#fc3903";
      case "in progress":
        return "#fffc59";
      case "delivered":
        return "#03fc7b";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <>
      {isClient ? (
        <>
          {/* Header */}
          <div className="header">
            <h2>Orders</h2>
          </div>
          {/* Buttons */}
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

          {/* Orders Table */}
          <div className="orders-table">
            <TableContainer>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Customer</Th>
                    <Th>Phone & Address:</Th>
                    <Th>Email:</Th>
                    <Th>Price:</Th>
                    <Th>Ordered at:</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order, index) => (
                    <Tr key={order.id}>
                      <Td>{index + 1}</Td>
                      <Td>{order.fullName}</Td>
                      <Td>
                        <p>{order.phoneNumber}</p>
                        <br />
                        <p>{order.address}</p>
                      </Td>
                      <Td>{order.email}</Td>
                      <Td>$ {order.totalPrice}</Td>
                      <Td>{order.orderedAt}</Td>
                      <Td>
                        <span
                          style={{
                            backgroundColor: getStatusBackgroundColor(
                              order.orderStatus
                            ),
                            borderRadius: "8px",
                            padding: "10px",
                          }}
                        >
                          {order.orderStatus}
                        </span>
                      </Td>
                      <Td>
                        <Tooltip label="Mark as In Progress" placement="top">
                          <Button
                            style={{
                              marginRight: "5px",
                              color: "white",
                            }}
                            colorScheme="yellow"
                            onClick={() =>
                              handleStatusChange(order.id, "In Progress")
                            }
                          >
                            <AiOutlineLoading3Quarters />
                          </Button>
                        </Tooltip>
                        <Tooltip label="Mark as Delivered" placement="top">
                          <Button
                            colorScheme="green"
                            onClick={() =>
                              handleStatusChange(order.id, "Delivered")
                            }
                          >
                            <FaCheckCircle />
                          </Button>
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : null}
    </>
  );
};

export default OrdersPage;
