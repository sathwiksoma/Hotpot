import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import AllOrders from '../../pages/AllOrders/AllOrders'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <hr/>
        <div className="sidebar-options">
        
           
            <p>AllOrders</p>

        </div>
        <div className='all-orders-dis'>
        <AllOrders/>
        </div>
    </div>
  )
}

export default Sidebar