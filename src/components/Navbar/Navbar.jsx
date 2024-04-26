import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, Route } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/Auth";
import Admin from "../../pages/Admin/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../LoginPopup/LoginPopup";

const Navbar = ({ setShowLogin, restaurantFilter, handleRestaurantSearch }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Log out successful");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="./">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile App")}
          className={menu === "mobile App" ? "active" : ""}
        >
          mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon-img">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-restaurant">
            <input
              type="text"
              placeholder="search by restaurant name"
              value={restaurantFilter}
              onChange={handleRestaurantSearch}
            />
          </div>
        </div>

        <div className="navbar-searh-icon">
          <Link to="./cart">
            {" "}
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!auth?.user ? (
          <>
            {/* <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li> */}
            <button onClick={() => setShowLogin(true)}>sign in</button>
          </>
        ) : (
          <>
            <h4>Hi {auth?.user}</h4>
            <UserPages user={auth?.user?.role} />
            <button onClick={handleLogout}>sign Out</button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;

function UserPages({ user }) {
  if (user == "Admin") {
    return (
      <Link to={`./Admin`} className="dropdown-item">
        Admin
      </Link>
    );
  } else if (user == "RestaurantOwner") {
    return (
      <Link to={`./RestaurantPage/:restaurantId`} className="dropdown-item">
        RestaurantOwner
      </Link>
    );
  }
}
