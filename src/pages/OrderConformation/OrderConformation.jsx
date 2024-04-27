import React from 'react';
import './OrderConformation.css';

const OrderConformation = () => {
  // Assuming you have a variable representing the delivery time in minutes
  const deliveryTime = 30; // Change this value to the actual delivery time
  const partnerName = localStorage.getItem('DeliveryPartnerName');
      console.log(partnerName);
  return (
    <div className="order-confirmation">
      <h2>Order Placed Successfully!</h2>

      <p>Your order will be delivered in {deliveryTime} minutes.</p>
      <p className="delivery-partner">By Delivery Partner: {partnerName}</p>
      <p>Thank you! Have a nice day.</p>
    </div>
  );
};

export default OrderConformation;
