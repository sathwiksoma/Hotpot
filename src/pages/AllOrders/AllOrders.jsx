import React, { useState, useEffect } from "react";
import axios from "axios";
import './AllOrders.css'

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7157/api/Restaurant/GetAllOrders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error while fetching orders", error);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="all-orders-title">All Orders</h1>
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>CustomerId</th>
            <th>RestaurantId</th>
            <th>PartnerId</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.orderDate}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.customerId}</td>
              <td>{order.restaurantId}</td>
              <td>{order.partnerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}