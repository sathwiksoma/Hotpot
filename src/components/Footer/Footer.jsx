import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            {" "}
            "Food, in the end, in our own tradition, is something holy. It's not
            about nutrients and calories. It's about sharing. It's about
            honesty. It's about identity."
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Contact Us</h2>
          <li>+91 9876543210</li>
          <li>hotpot@gmail.com</li>
        </div>
      </div>
      <hr />
      <p className="footer-copy-right">
        {" "}
        All trademarks are properties of their respective owners copyrights 2024
        © Hotpot™ Ltd. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
