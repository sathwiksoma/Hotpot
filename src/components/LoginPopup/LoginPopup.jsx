import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  var user = {};
  var navigate = useNavigate();
  var handleLogin = async (e) => {
    e.preventDefault();
    if (currState == "Login") {
      user.userId = 0;
      user.userName = username;
      user.password = password;
      user.role = "";
      user.token = "";

      console.log(user);

      try {
        const response = await axios.post(
          "https://localhost:7157/api/Auth/login",
          user
        );

        const responseData = response.data;

        localStorage.setItem("auth", JSON.stringify(responseData)); //storing our user object in local storage

        console.log(responseData.userName);

        if (responseData.role === "Admin") {
          window.location.href = "http://localhost:5173/Admin";
        } else if (responseData.role === "RestaurantOwner") {
          const ownerResponse = await axios.get(
            `https://localhost:7157/api/Restaurant/GetRestaurantOwnerByUsername?username=${user.userName}`
          );
          const restaurantId = ownerResponse.data.restaurantId;
          console.log(restaurantId);
          window.location.href = `http://localhost:5173/RestaurantPage/${restaurantId}`;

          //navigate(RestaurantPage/${restaurantId});
        } else if (responseData.role === "Customer") {
          try {
            const customerResponse = await axios.get(
              `https://localhost:7157/api/Customer/GetCustomerByUsername?username=${user.userName}`
            );
            console.log("Customer Response:", customerResponse.data); // Log the entire response object
            const customerId = customerResponse.data.value.id;
            console.log("Customer ID:", customerId); // Log customerId
            // Verify customerId is not undefined or null
            if (!customerId) {
              console.error("Customer ID is missing or invalid.");
              return;
            }
            // Store customerId in sessionStorage

            localStorage.setItem("customerId", customerId);
            window.location.href = "http://localhost:5173/";
          } catch (error) {
            console.error("Error fetching customer data:", error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.userName = username;
      user.password = password;
      user.role = "";

      try {
        const response = await axios.post(
          "https://localhost:7157/api/Customer/Register",
          user
        );
        console.log(response);
        setCurrState("Login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                className="input-2"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input-2"
                type="email" // Change type to email for email input
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="input-2"
                type="text" // Change type to email for email input
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </>
          )}
          <input
            className="input-2"
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="button-1" type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;