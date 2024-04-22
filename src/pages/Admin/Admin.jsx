import React from 'react'
import './Admin.css'
import { Routes,Route, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllOrders from '../AllOrders/AllOrders';
const Admin = () => {
    const navigate = useNavigate();
    
  return (
    <div className="admin-page-header">
      <p className='admin-title'>Admin Portal</p>
      <hr/>
    <Sidebar/>
    
   

    
    </div>
  )
}

export default Admin