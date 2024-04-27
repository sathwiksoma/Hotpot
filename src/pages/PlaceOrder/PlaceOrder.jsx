import React, { useContext } from 'react';
import './PlaceOrder.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext); // Assuming you have a context containing cartId
  const navigate = useNavigate();

  const handleProceedToPayment = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Retrieve customerId from sessionStorage
      const customerId = localStorage.getItem('customerId');
      console.log('Retrieved Customer ID:', customerId);
      // Make POST request to your API endpoint with the cartId
      const response = await axios.post(`https://localhost:7157/api/Customer/PlaceOrderForAll?customerId=${customerId}&paymentMode=online`);

      // Handle successful response, e.g., redirect to payment page

      console.log('Order placed successfully:', response.data);
      // Redirect to payment page or show a confirmation message
      const partnerName = response.data.partnerName; 
      console.log('Partnername:', partnerName);
      localStorage.setItem('DeliveryPartnerName', partnerName);


      // Navigate to the order confirmation page
      navigate('/OrderConformation');
    } catch (error) {
      // Handle error
      console.error('Error placing order:', error);
      // Display an error message to the user
    }
  };

  return (
    <form className='place-order' onSubmit={handleProceedToPayment}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder=' Last Name' />
        </div>
        <input type="text" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-field">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-field">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder=' Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right"></div>
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
        </div>
        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
