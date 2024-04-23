import React, { useState } from 'react';
import './Sidebar.css';
import AllOrders from '../../pages/AllOrders/AllOrders';
import AllRestaurants from '../../pages/AllRestaurants/AllRestaurants';
import AllMenus from '../../pages/AllMenus/AllMenus';

const Sidebar = () => {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  const [showAllMenus, setShowAllMenus] = useState(false);


  const handleAllOrdersClick = () => {
    setShowAllOrders(true);
    setShowAllRestaurants(false);
    setShowAllMenus(false);
  };

  const handleAllRestaurantsClick = () => {
    setShowAllOrders(false);
    setShowAllRestaurants(true);
    setShowAllMenus(false);

    
  };
  const handleAllMenusClick = () => {
    setShowAllOrders(false);
    setShowAllRestaurants(false);
    setShowAllMenus(true);

    
  };

  return (
    <div className='sidebar'>
      <hr />
      <div className="sidebar-options">
        <div className="sidebar-option">
          <button onClick={handleAllOrdersClick}>All Orders</button>
        </div>
        <div className="sidebar-option">
          <button onClick={handleAllRestaurantsClick}>All Restaurants</button>
        </div>
        <div className="sidebar-option">
          <button onClick={handleAllMenusClick}>All Menus</button>
        </div>
      </div>

      <div className='content'>
        {showAllOrders && <AllOrders />}
        {showAllRestaurants && <AllRestaurants />}
        {showAllMenus && <AllMenus />}
      </div>
    </div>
  );
};

export default Sidebar;
