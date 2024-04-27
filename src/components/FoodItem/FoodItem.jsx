import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const FoodItem = ({ id, name, price, description, image, restaurant }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    const handleAddToCart = () => {
        addToCart(id); // Add the food item id to the cart
        console.log('itemid',id);
        // Retrieve customerId from sessionStorage
      const customerId = localStorage.getItem('customerId');
      console.log('Retrieved Customer ID:', customerId); // Log the retrieved customerId

      // Proceed with adding items to the cart using customerId
      // Make sure customerId is not null or undefined
      if (!customerId) {
        console.error('Customer ID is missing from sessionStorage.');
        return;
      }

      // Prepare data for adding items to the cart
     
      // Make POST request to backend API to add items to the cart
      const response = axios.post(`https://localhost:7157/api/Customer/AddToCart?userId=${customerId}&menuItemId=${id}`);
      console.log(response);
      // Handle successful response
      const cartId=response.data;
      localStorage.setItem('cartId', cartId);


      console.log('Items added to cart successfully:', cartId);
  
    };

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt="" />
                {!cartItems[id] ?
                    <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
                    :
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">{price}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>

            </div>
        </div>
    );
};

export default FoodItem;
