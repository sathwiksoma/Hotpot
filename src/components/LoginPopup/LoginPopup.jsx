import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { SignIn } from "./SignIn";

export class User {
  userId;
  userName;
  password;
  email;
  role;
  token;
  constructor(userId, userName, password, email, role, token) {
    this.userId = userId;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let user = new User(0, "", "", "", "", "");
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    user.userId = 0;
    user.userName = username;
    user.password = password;
    user.email = email;
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

      if (responseData.role == "Admin") {
        // navigate("/Admin");
        window.location.href = "http://localhost:5173/Admin";
        setShowLogin(false);
      } else if (responseData.role == "RestaurantOwner") {
        const ownerResponse = await axios.get(
          `https://localhost:7157/api/Restaurant/GetRestaurantOwnerByUsername?username=${user.userName}`
        );
        const restaurantId = ownerResponse.data.restaurantId;
        console.log(restaurantId);
        // navigate(`RestaurantPage/${restaurantId}`);
        window.location.href = `http://localhost:5173/RestaurantPage/${restaurantId}`;
        setShowLogin(false);
      } else {
        window.location.href = "http://localhost:5173/";
      }
    } catch (error) {
      console.log(error);
    }
  }
  // return <SignIn />;
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
          <input
            className="input-2"
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {currState != "Login" && (
            <input
              className="input-2"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            className="input-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* <Button
          style={{
            padding: "10px",
            borderRadius: "4px",
            color: "white",
            backgroundColor: " tomato",
            fontSize: "15px",
            cursor: " pointer",
          }}
          onClick={() => {
            console.log(user), setShowLogin(false);
          }}
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </Button> */}
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
