import React, { useState } from "react";
import "./RestaurantPage.css";
import SidebarRestaurant from "../../components/SidebarRestaurant/SidebarRestaurant";
import OrdersByRestaurant from "../../pages/OrdersByRestaurant/OrdersByRestaurant";
import MenusByRestaurant from "../../pages/MenusByRestaurant/MenusByRestaurant";
import PaymentsByRestaurant from "../../pages/PaymentsByRestaurant/PaymentsByRestaurant";

const RestaurantPage = () => {
  const [showOrders, setShowOrders] = useState(true);
  const [showMenus, setShowMenus] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const handleOrdersClick = () => {
    setShowOrders(true);
    setShowMenus(false);
    setShowPayments(false);
  };

  const handleMenusClick = () => {
    setShowOrders(false);
    setShowMenus(true);
    setShowPayments(false);
  };

  const handlePaymentsClick = () => {
    setShowOrders(false);
    setShowMenus(false);
    setShowPayments(true);
  };

  return (
    <div className="Restaurant-page-header">
      <p className="Restaurant-title">Restaurant Portal</p>
      <hr />
      <div className="parent">
        <div className="child1">
          <div className="sidebar-options">
            <div className="sidebar-option">
              <button onClick={handleOrdersClick}>Orders</button>
            </div>
            <div className="sidebar-option">
              <button onClick={handleMenusClick}>Menu</button>
            </div>
            <div className="sidebar-option">
              <button onClick={handlePaymentsClick}>Payments</button>
            </div>
          </div>
        </div>
        <div className="child2">
          {showOrders && <OrdersByRestaurant />}
          {showMenus && <MenusByRestaurant />}
          {showPayments && <PaymentsByRestaurant />}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
