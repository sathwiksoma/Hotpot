import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const handleProceedToCheckout = async () => {
    try {
      console.log("ProceedToCheckOut Called");

      // // Retrieve customerId from sessionStorage
      // const customerId = localStorage.getItem('customerId');
      // console.log('Retrieved Customer ID:', customerId); // Log the retrieved customerId

      // // Proceed with adding items to the cart using customerId
      // // Make sure customerId is not null or undefined
      // if (!customerId) {
      //   console.error('Customer ID is missing from sessionStorage.');
      //   return;
      // }

      // // Prepare data for adding items to the cart
      // const itemsToAdd = food_list.filter(item => cartItems[item._id] > 0)
      //                               .map(item => item._id);
      // console.log(itemsToAdd);
      // // Make POST request to backend API to add items to the cart
      // const response = await axios.post(`https://localhost:7157/api/Customer/AddToCart?userId=${customerId}&menuItemId=${itemsToAdd}`);
      // console.log(response);
      // // Handle successful response
      // const cartId=response.data;
      // localStorage.setItem('customerId', cartId);

      // console.log('Items added to cart successfully:', cartId);

      // Redirect to the order page
      navigate("/order");
    } catch (error) {
      // Handle error
      console.error("Error adding items to cart:", error);
    }
  };

  return (
    <div className="cart">
      <div>
        <div>
          <table className="cart-table">
            <th>Id</th>
            <th> Title</th>
            <th>Restaurant Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th> Total</th>
            <th>Remove</th>
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.restaurant}</td>
                    <td>{item.price}</td>
                    <td>{cartItems[item._id]}</td>
                    <td>{item.price * cartItems[item._id]}</td>
                    <td
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      x
                    </td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
        <br />
      </div>
      <div className="cart-bottom">
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
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
