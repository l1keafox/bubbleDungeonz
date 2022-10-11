import React, { useState } from "react";
import "./Header.css";
import { FaHamburger } from "react-icons/fa";

function Header() {
  const [logInOrOut, setLogInOrOut] = useState("Login");

  return (
    <div>
      <h1>App Title</h1>
      <ul>
        <li>Home</li>
        <li>Games</li>
        <li>{logInOrOut}</li>
        <li>
          <FaHamburger></FaHamburger>
        </li>
      </ul>
    </div>
  );
}

export default Header;
