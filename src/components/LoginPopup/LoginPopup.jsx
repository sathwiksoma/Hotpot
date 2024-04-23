import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

var user = {};
var navigate = useNavigate();
var handleLogin = async (e) => {
  e.preventDefault();
        user.userId=0;
        user.userName=username;
        user.password=password;
        user.role="";
        user.token="";

        console.log(user);

        var requestOptions={
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        };
        fetch("https://localhost:7157/api/Auth/login", requestOptions)
        .then(r=>r.json())
        .then(r=>{
            if(r.role==="Admin"){
              window.location.href = "http://localhost:5173/Admin"
            }
            else if(r.role==="Customer")
            {
              window.location.href = "www.google.com"
            }
        })
        .catch(e=>{
            console.log(e);
        })
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
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
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